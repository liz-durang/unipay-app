use soroban_sdk::{contracttype, Address, String};

#[derive(Clone, PartialEq, Debug)]
#[contracttype]
#[repr(u32)]
pub enum ClientStatus {
    Enabled,  // 0
    Disabled, // 1
}

#[derive(Clone)]
#[contracttype]
pub struct Client {
    pub balance: i128,
    pub status: ClientStatus,
}


#[derive(Clone)]
#[contracttype]
pub struct Inversor {
    pub id: Address,
    pub balance: i128,
}

#[derive(Clone)]
#[contracttype]
pub struct Student {
    pub id: String, 
    pub name: String, 
    pub average: i128,
    pub loan_approved: bool, 
    pub scholarship_approved: bool,
    pub balance: i128,
}

pub struct University {
    pub id: String, 
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,           // Address
    Token,           // XLM Testnet Address
    ContractBalance, // i128
    Client(Address),
    Recieve(Address), // balance: i128
}
