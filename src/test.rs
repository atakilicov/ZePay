#![cfg(test)]

use soroban_sdk::{Env, testutils::{Address as _, Ledger, LedgerInfo}, Address};
use crate::{PayrollVault, PayrollVaultClient};

#[test]
fn test_payroll_basic() {
    let env = Env::default();
    env.mock_all_auths();

    // Aktörleri oluştur
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let token_address = Address::generate(&env);
    
    // Kontratı deploy et
    let contract_id = env.register(PayrollVault, ());
    let client = PayrollVaultClient::new(&env, &contract_id);

    // Zaman ayarla
    let current_time = 12345;
    let release_time = current_time + 10000; // 10000 saniye sonra
    env.ledger().set(LedgerInfo {
        timestamp: current_time,
        protocol_version: 22,
        sequence_number: 0,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 10,
        min_persistent_entry_ttl: 10,
        max_entry_ttl: 3110400,
    });

    // Maaş durumunu kontrol et (başlangıçta 0 olmalı)
    let (amount, time) = client.check_status(&worker);
    assert_eq!(amount, 0);
    assert_eq!(time, 0);

    // İşveren çalışana maaş ataması yapar
    client.assign_salary(&employer, &worker, &token_address, &500, &release_time);

    // Maaş durumunu kontrol et
    let (amount, time) = client.check_status(&worker);
    assert_eq!(amount, 500);
    assert_eq!(time, release_time);
}

#[test]
fn test_check_status() {
    let env = Env::default();
    env.mock_all_auths();

    // Aktörleri oluştur
    let worker = Address::generate(&env);
    
    // Kontratı deploy et
    let contract_id = env.register(PayrollVault, ());
    let client = PayrollVaultClient::new(&env, &contract_id);

    // Maaş durumunu kontrol et (başlangıçta 0 olmalı)
    let (amount, time) = client.check_status(&worker);
    assert_eq!(amount, 0);
    assert_eq!(time, 0);
} 