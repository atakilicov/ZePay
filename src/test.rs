#![cfg(test)]

use super::*;
use soroban_sdk::{vec, Env, String};
use crate::{PayrollVault, PayrollVaultClient};
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    Address, Symbol, token, IntoVal,
};

mod token_fixture {
    soroban_sdk::contractimport!(
        file = "soroban_token_spec.wasm",
        export_name = "TestToken"
    );

    pub fn create_token(e: &soroban_sdk::Env, admin: &soroban_sdk::Address) -> (TestTokenClient, soroban_sdk::Address) {
        let contract_address = e.register_stellar_asset_contract(admin.clone());
        (TestTokenClient::new(e, &contract_address), contract_address)
    }
}

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let words = client.hello(&String::from_str(&env, "Dev"));
    assert_eq!(
        words,
        vec![
            &env,
            String::from_str(&env, "Hello"),
            String::from_str(&env, "Dev"),
        ]
    );
}

#[test]
fn test_payroll_vault() {
    let env = Env::default();
    env.mock_all_auths();

    // Aktörleri oluştur
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);

    // Token oluştur
    let (token_client, token_address) = token_fixture::create_token(&env, &employer);
    
    // Kontratı deploy et
    let contract_id = env.register_contract(None, PayrollVault);
    let client = PayrollVaultClient::new(&env, &contract_id);

    // İşverene token ver
    token_client.mint(&employer, &1000);
    
    // Zaman ayarla
    let current_time = 12345;
    let release_time = current_time + 10000; // 10000 saniye sonra
    env.ledger().set(LedgerInfo {
        timestamp: current_time,
        protocol_version: 20,
        sequence_number: 0,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 10,
        min_persistent_entry_ttl: 10,
        max_entry_ttl: 3110400,
    });

    // İşveren çalışana maaş ataması yapar
    token_client.approve(&employer, &contract_id, &500, &200);
    client.assign_salary(&worker, &token_address, &500, &release_time);

    // Maaş durumunu kontrol et
    let (amount, time) = client.check_status(&worker);
    assert_eq!(amount, 500);
    assert_eq!(time, release_time);

    // Erken çekmeyi dene (hata vermeli)
    let result = std::panic::catch_unwind(|| {
        env.as_contract(&contract_id, || {
            env.mock_all_auths();
            env.invoker().set(worker.clone());
            crate::PayrollVault::claim_salary(env.clone())
        })
    });
    assert!(result.is_err());

    // Zamanı ileri al
    env.ledger().set(LedgerInfo {
        timestamp: release_time + 1,
        protocol_version: 20,
        sequence_number: 0,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 10,
        min_persistent_entry_ttl: 10,
        max_entry_ttl: 3110400,
    });

    // Maaşı çek
    env.mock_all_auths();
    env.invoker().set(worker.clone());
    let claimed_amount = env.as_contract(&contract_id, || {
        crate::PayrollVault::claim_salary(env.clone())
    });
    assert_eq!(claimed_amount, 500);

    // Maaş durumunu tekrar kontrol et (sıfırlanmış olmalı)
    let (amount, time) = client.check_status(&worker);
    assert_eq!(amount, 0);
    assert_eq!(time, 0);

    // Token bakiyelerini kontrol et
    assert_eq!(token_client.balance(&employer), 500);
    assert_eq!(token_client.balance(&worker), 500);
}
