#![no_std]

use soroban_sdk::{contract, contractimpl, Env, Address, symbol_short, Symbol};

#[contract]
pub struct ScholarshipContract;

const SCHOLARSHIP_KEY: Symbol = symbol_short!("SCHOLAR");

#[contractimpl]
impl ScholarshipContract {
    pub fn set_scholarship(env: &Env, student: Address, amount: i128) {
        env.storage().persistent().set(&student, &amount);
    }

    pub fn get_scholarship(env: &Env, student: Address) -> i128 {
        env.storage().persistent().get(&student).unwrap_or(0)
    }
}
