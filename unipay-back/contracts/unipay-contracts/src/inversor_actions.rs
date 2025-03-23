use soroban_sdk::{Address, Env};

use crate::storage;
use crate::types;
use crate::token;

fn check_admin(env: &Env) {
    if !storage::has_admin(&env) {
        panic!("Admin not assigned to the contract");
    }

    let admin = storage::read_admin(&env);

    admin.require_auth();
}

pub fn get_admin(env: Env) -> Address {
    storage::read_admin(&env)
}


pub fn add_inversor(env: &Env, inversor: Address) {
    check_admin(env); 

    let balance: i128 = 0; // Se define balance antes de usarlo.
    let id: Address = inversor.clone();

    let data = types::Inversor {
        id, 
        balance,
    };

    storage::write_inversor(env, &inversor, &data); 
}


pub fn deposit(env: Env, from: Address, to: Address, amount: i128) {
    from.require_auth();

    if !storage::has_inversor(&env, &from) {
        panic!("Inversor does not found");
    }
    let mut from_inversor = storage::read_inversor(&env, &from);

    if !storage::has_recieve_inversor(&env, &to) {
        panic!("Recieve does not found");
    }
    let mut contract_balance = storage::read_contract_balance_inversor(&env);

    token::token_transfer(&env, &from, &env.current_contract_address(), &amount);

    from_inversor.balance -= amount;
    storage::write_inversor(&env, &from, &from_inversor
    );

    contract_balance += amount;
    storage::write_contract_balance(&env, &contract_balance);

    let mut to_balance = storage::read_recieve(&env, &to);
    to_balance += amount;
    storage::write_recieve(&env, &to, &to_balance);
}

