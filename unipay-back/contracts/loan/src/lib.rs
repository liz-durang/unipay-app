#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, symbol_short, Symbol};

#[contract]
pub struct LoanContract;

const LOAN_KEY: Symbol = symbol_short!("LOAN");

#[derive(Default)]
pub struct LoanSetup {
    total_pool: i128,
    num_months: u64,
    interest_rate: i128, // Representamos la tasa de interés como un entero (por ejemplo, 5 para un 5% de interés)
    approved_credit: i128,
    final_payment: i128,
    opening_fee: i128,
    monthly_payment: i128,
    remaining_payment: i128,
}

#[contractimpl]
impl LoanContract {
    // Función para configurar el préstamo
    pub fn setup_loan(
        env: &Env,
        total_pool: i128,
        num_months: u64,
        interest_rate: i128, // La tasa de interés en formato entero (por ejemplo, 5 para un 5%)
        approved_credit: i128,
    ) -> LoanSetup {
        // Calculamos el interés en base al porcentaje
        let interest_amount = (approved_credit * interest_rate) / 100;
        let total_payment = approved_credit + interest_amount;
        
        // Calculamos el pago mensual
        let monthly_payment = total_payment / num_months as i128;

        // Calculamos la comisión por apertura (suponemos un 2% como ejemplo)
        let opening_fee = (approved_credit * 2) / 100;

        // Calculamos el pago final
        let final_payment = total_payment + opening_fee;

        LoanSetup {
            total_pool,
            num_months,
            interest_rate,
            approved_credit,
            final_payment,
            opening_fee,
            monthly_payment,
            remaining_payment: final_payment, // inicializamos el pago restante con el pago final
        }
    }

    // Función para establecer un préstamo para un estudiante
    pub fn set_loan(env: &Env, borrower: Address, amount: i128) {
        env.storage().persistent().set(&borrower, &amount);
    }

    // Función para obtener el monto del préstamo de un estudiante
    pub fn get_loan(env: &Env, borrower: Address) -> i128 {
        env.storage().persistent().get(&borrower).unwrap_or(0)
    }

    // Función para enviar el préstamo al estudiante
    pub fn send_loan_to_student(env: &Env, borrower: Address, loan_setup: &LoanSetup) {
        // Verificamos si hay suficiente fondo en el pool para el préstamo
        if loan_setup.total_pool < loan_setup.approved_credit {
            panic!("No hay suficiente fondo en el pool para el préstamo");
        }

        // Reducimos el total del pool de fondos
        let mut state = env.state();
        let mut loan_state = state.get::<LoanSetup>().unwrap_or_default();
        loan_state.total_pool -= loan_setup.approved_credit;

        // Enviamos el préstamo al estudiante
        env.storage().persistent().set(&borrower, &loan_setup.approved_credit);

        // Actualizamos el estado con el nuevo monto en el pool
        state.set(loan_state);

        // Emitir evento de préstamo enviado
        env.emit_event("LoanSent", &borrower);
    }

    // Función para recibir el pago mensual de un estudiante
    pub fn receive_payment(env: &Env, borrower: Address, payment_amount: i128) {
        // Obtenemos el préstamo actual del estudiante
        let mut state = env.state();
        let mut loan_state = state.get::<LoanSetup>().unwrap_or_default();

        // Obtenemos el monto del préstamo
        let loan_balance = env.storage().persistent().get::<i128>(&borrower).unwrap_or(0);

        // Verificamos que el pago sea válido
        if payment_amount <= 0 {
            panic!("El pago debe ser un monto positivo");
        }

        // Reducimos el pago del préstamo
        if loan_balance >= payment_amount {
            // Actualizamos el saldo del préstamo
            env.storage().persistent().set(&borrower, &(loan_balance - payment_amount));

            // Actualizamos el pago restante
            loan_state.remaining_payment -= payment_amount;

            // Guardamos el estado actualizado
            state.set(loan_state);
        } else {
            panic!("El pago excede el saldo pendiente del préstamo");
        }

        // Emitir evento de pago recibido
        env.emit_event("LoanPaymentReceived", &borrower);
    }

    // Función para obtener el saldo restante del préstamo de un estudiante
    pub fn get_remaining_payment(env: &Env, borrower: Address) -> i128 {
        let loan_balance = env.storage().persistent().get::<i128>(&borrower).unwrap_or(0);
        loan_balance
    }

    // Función para obtener el pago mensual de un estudiante
    pub fn get_monthly_payment(env: &Env, borrower: Address) -> i128 {
        let mut state = env.state();
        let loan_state = state.get::<LoanSetup>().unwrap_or_default();
        loan_state.monthly_payment
    }
}
