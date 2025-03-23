use soroban_sdk::{contractimpl, Env, Address, Timestamp};
use std::collections::HashMap;

pub struct ScholarshipContract;

#[derive(Default)]
pub struct ScholarshipSetup {
    total_funds: u64,
    num_students: u64,
    num_months: u64,
    start_date: Timestamp,
    distribution_dates: Vec<Timestamp>,
}

#[derive(Default)]
pub struct ScholarshipState {
    setup: ScholarshipSetup,
    funds_received: u64,
    student_funds: HashMap<Address, u64>,
    yield_farming_contract: Option<Address>,
    loan_contract: Option<Address>,
}

#[contractimpl]
impl ScholarshipContract {
    // Función para configurar la beca
    pub fn setup_scholarship(
        env: &Env,
        total_funds: u64,
        num_students: u64,
        num_months: u64,
        start_date: Timestamp,
    ) -> ScholarshipSetup {
        let mut distribution_dates = Vec::new();
        let mut current_date = start_date;

        // Calculamos las fechas de distribución de los fondos
        for _ in 0..num_months {
            distribution_dates.push(current_date);
            current_date += 30 * 24 * 60 * 60; // sumamos 30 días (aproximadamente un mes en segundos)
        }

        // Retornamos la configuración de la beca
        ScholarshipSetup {
            total_funds,
            num_students,
            num_months,
            start_date,
            distribution_dates,
        }
    }

    // Función para recibir los fondos
    pub fn receive_funds(env: &Env, amount: u64) -> u64 {
        let mut state = env.state();
        let mut scholarship_state = state.get::<ScholarshipState>().unwrap_or_default();
        scholarship_state.funds_received += amount;
        state.set(scholarship_state);
        scholarship_state.funds_received
    }

    // Función para distribuir fondos entre los estudiantes
    pub fn distribute_funds(
        env: &Env,
        scholarship_state: &mut ScholarshipState,
        students: Vec<Address>,
    ) {
        let amount_per_student = scholarship_state.funds_received / scholarship_state.setup.num_students;
        
        for student in students {
            scholarship_state.student_funds.insert(student.clone(), amount_per_student);
        }

        // Guardar el estado actualizado
        let mut state = env.state();
        state.set(scholarship_state.clone());
    }

    // Función para enviar fondos a un contrato de yield farming
    pub fn send_to_yield_farming(
        env: &Env,
        scholarship_state: &mut ScholarshipState,
        amount: u64,
        yield_farming_contract: Address,
    ) {
        // Aseguramos que haya suficientes fondos
        if scholarship_state.funds_received < amount {
            panic!("No hay suficientes fondos disponibles para enviar al yield farming");
        }

        // Enviamos los fondos al contrato de yield farming
        scholarship_state.funds_received -= amount;
        scholarship_state.yield_farming_contract = Some(yield_farming_contract);

        // Guardar el estado actualizado
        let mut state = env.state();
        state.set(scholarship_state.clone());
    }

    // Función para recibir los rendimientos del yield farming
    pub fn receive_yield_farming_rewards(
        env: &Env,
        scholarship_state: &mut ScholarshipState,
        rewards: u64,
    ) {
        // Verificamos que el contrato de yield farming esté configurado
        match scholarship_state.yield_farming_contract {
            Some(ref contract) => {
                // Recibimos los rendimientos
                let total_rewards = rewards;
                
                // Enviamos los rendimientos al contrato de préstamos
                if let Some(loan_contract) = &scholarship_state.loan_contract {
                    // Aquí podrías realizar la lógica para transferir los rendimientos al contrato de préstamos
                    // Por ejemplo: transferir_rewards_to_loan_contract(total_rewards, loan_contract);
                    env.emit_event("YieldFarmingRewardsReceived", &total_rewards);
                }

                // Guardamos el estado actualizado
                scholarship_state.funds_received += total_rewards;
                let mut state = env.state();
                state.set(scholarship_state.clone());
            }
            None => panic!("No se ha configurado un contrato de yield farming"),
        }
    }

    // Función para asignar un contrato de préstamos
    pub fn set_loan_contract(
        env: &Env,
        scholarship_state: &mut ScholarshipState,
        loan_contract: Address,
    ) {
        scholarship_state.loan_contract = Some(loan_contract);

        // Guardar el estado actualizado
        let mut state = env.state();
        state.set(scholarship_state.clone());
    }

    // Función para configurar la beca de un estudiante específico
    pub fn set_scholarship(env: &Env, student: Address, amount: i128) {
        env.storage().persistent().set(&student, &amount);
    }

    // Función para obtener el monto de la beca de un estudiante
    pub fn get_scholarship(env: &Env, student: Address) -> i128 {
        env.storage().persistent().get(&student).unwrap_or(0)
    }
}
