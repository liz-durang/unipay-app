#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, String};

mod storage;
mod token;
mod types;
mod scholarship_contract;
mod loan_contract;

#[contract]
pub struct UnipayContract;

#[contractimpl]
impl UnipayContract {
    // Inicializa el contrato Unipay, y también inicializa los contratos asociados.
    pub fn initialize_unipay(env: &Env, admin: Address, token: Address) {
        if storage::has_admin(env) {
            panic!("Already initialized");
        }
        storage::write_admin(env, &admin);
        storage::write_token(env, &token);

        // Inicialización de los contratos de beca y préstamo.
        scholarship_contract::ScholarshipContract::initialize(env, admin.clone(), token.clone());
        loan_contract::LoanContract::initialize(env, admin, token);
    }

    // Establece una beca para un estudiante específico.
    pub fn set_scholarship(env: &Env, student: Address, amount: i128) {
        Self::require_admin(env, "unipay"); // Verifica si el administrador tiene autoridad.
        scholarship_contract::ScholarshipContract::set_scholarship(env, student, amount);
    }

    // Obtiene la beca de un estudiante.
    pub fn get_scholarship(env: &Env, student: Address) -> i128 {
        scholarship_contract::ScholarshipContract::get_scholarship(env, student)
    }

    // Establece un préstamo para un prestatario específico.
    pub fn set_loan(env: &Env, borrower: Address, amount: i128) {
        Self::require_admin(env, "unipay"); // Verifica si el administrador tiene autoridad.
        loan_contract::LoanContract::set_loan(env, borrower, amount);
    }

    // Obtiene el préstamo de un prestatario.
    pub fn get_loan(env: &Env, borrower: Address) -> i128 {
        loan_contract::LoanContract::get_loan(env, borrower)
    }

    // Verifica si el administrador del contrato tiene autoridad.
    fn require_admin(env: &Env, contract_name: &str) {
        let admin = Self::get_admin(env, contract_name);
        admin.require_auth();
    }

    // Obtiene la dirección del administrador para un contrato específico.
    pub fn get_admin(env: &Env, contract_name: &str) -> Address {
        match contract_name {
            "unipay" => storage::read_admin(env), // Admin para el contrato Unipay.
            "scholarship" => scholarship_contract::storage::read_admin(env), // Admin para el contrato Scholarship.
            "loan" => loan_contract::storage::read_admin(env), // Admin para el contrato Loan.
            _ => panic!("Contrato desconocido"), // Si el nombre del contrato no es reconocido, lanza un error.
        }
    }
}
