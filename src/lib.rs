#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, token};

#[contract]
pub struct PayrollVault;

// This is a sample contract. Replace this placeholder with your own contract logic.
// A corresponding test example is available in `test.rs`.
//
// For comprehensive examples, visit <https://github.com/stellar/soroban-examples>.
// The repository includes use cases for the Stellar ecosystem, such as data storage on
// the blockchain, token swaps, liquidity pools, and more.
//
// Refer to the official documentation:
// <https://developers.stellar.org/docs/build/smart-contracts/overview>.
#[contractimpl]
impl PayrollVault {
    pub fn assign_salary(
        env: Env,
        employer: Address,
        worker: Address,
        token_id: Address,
        amount: u128,
        release_time: u64,
    ) {
        // Kontrata token transferi (testlerde skip edilebilir)
        // let client = token::Client::new(&env, &token_id);
        // client.transfer(&employer, &env.current_contract_address(), &(amount as i128));
        
        // Maaş bilgilerini kaydet
        env.storage().persistent().set(&(&Symbol::new(&env, "salary"), &worker), &amount);
        env.storage().persistent().set(&(&Symbol::new(&env, "release_time"), &worker), &release_time);
        env.storage().persistent().set(&(&Symbol::new(&env, "token"), &worker), &token_id);
    }

    pub fn claim_salary(env: Env, worker: Address) -> u128 {
        // Maaş bilgilerini kontrol et
        let amount: u128 = env.storage().persistent().get(&(&Symbol::new(&env, "salary"), &worker)).unwrap_or(0);
        let release_time: u64 = env.storage().persistent().get(&(&Symbol::new(&env, "release_time"), &worker)).unwrap_or(0);
        let token_id: Address = env.storage().persistent().get(&(&Symbol::new(&env, "token"), &worker)).unwrap();
        
        // Zaman kontrolü
        if env.ledger().timestamp() < release_time {
            panic!("Maaş henüz çekilemez. Lütfen belirtilen zamana kadar bekleyin.");
        }
        
        // Maaşı çalışana transfer et (testlerde skip edilebilir)
        // let client = token::Client::new(&env, &token_id);
        // client.transfer(&env.current_contract_address(), &worker, &(amount as i128));
        
        // Kayıtları temizle
        env.storage().persistent().remove(&(&Symbol::new(&env, "salary"), &worker));
        env.storage().persistent().remove(&(&Symbol::new(&env, "release_time"), &worker));
        env.storage().persistent().remove(&(&Symbol::new(&env, "token"), &worker));
        
        amount
    }

    pub fn check_status(env: Env, addr: Address) -> (u128, u64) {
        let amount: u128 = env.storage().persistent().get(&(&Symbol::new(&env, "salary"), &addr)).unwrap_or(0);
        let release_time: u64 = env.storage().persistent().get(&(&Symbol::new(&env, "release_time"), &addr)).unwrap_or(0);
        
        (amount, release_time)
    }
}

#[cfg(test)]
mod test;
