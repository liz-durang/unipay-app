#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, symbol_short, Symbol};

#[contract]
pub struct LoanContract;

const LOAN_KEY: Symbol = symbol_short!("LOAN");

#[contractimpl]
impl LoanContract {
    pub fn set_loan(env: &Env, borrower: Address, amount: i128) {
        env.storage().persistent().set(&borrower, &amount);
    }

    pub fn get_loan(env: &Env, borrower: Address) -> i128 {
        env.storage().persistent().get(&borrower).unwrap_or(0)
    }
}

