#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address};

mod storage;
mod token;
mod types;

#[contract]
pub struct ScholarshipContract;

#[contract]
pub struct LoanContract;

#[contractimpl]
impl ScholarshipContract {
    pub fn initialize_scholarship(env: &Env, admin: Address, token: Address) {
        if storage::has_admin(env) {
            panic!("Already initialized");
        }
        storage::write_admin(env, &admin);
        storage::write_token(env, &token);
    }

    pub fn set_scholarship(env: &Env, student: Address, amount: i128) {
        ScholarshipContract::require_admin(env);
        env.storage().persistent().set(&student, &amount);
    }

    pub fn get_scholarship(env: &Env, student: Address) -> i128 {
        env.storage().persistent().get(&student).unwrap_or(0)
    }

    fn require_admin(env: &Env) {
        if storage::has_admin(&env) {
            panic!("El contrato ya ha sido inicializado");
        }
    }
}

#[contractimpl]
impl LoanContract {
    pub fn initialize_loan(env: &Env, admin: Address, token: Address) {
        if storage::has_admin(env) {
            panic!("Already initialized");
        }
        storage::write_admin(env, &admin);
        storage::write_token(env, &token);
    }

    pub fn set_loan(env: &Env, borrower: Address, amount: i128) {
        LoanContract::require_admin(env);
        env.storage().persistent().set(&borrower, &amount);
    }

    pub fn get_loan(env: &Env, borrower: Address) -> i128 {
        env.storage().persistent().get(&borrower).unwrap_or(0)
    }

    fn require_admin(env: &Env) {
        if storage::has_admin(&env) {
            panic!("El contrato ya ha sido inicializado");
        }
    }
}
