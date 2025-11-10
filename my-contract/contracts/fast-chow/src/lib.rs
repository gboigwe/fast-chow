#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, Address, Env, String, Vec, Symbol, symbol_short
};

const TRANSACTION_FEE: i128 = 10_000_000; // 0.001 XLM (in stroops, 1 XLM = 10,000,000 stroops)
const FIVE_MINUTES: u64 = 300; // 300 seconds

// Order status enum
#[contracttype]
#[derive(Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum OrderStatus {
    Pending = 0,
    Paid = 1,
    Confirmed = 2,
    Completed = 3,
    Cancelled = 4,
}

// Order data structure
#[contracttype]
#[derive(Clone)]
pub struct Order {
    pub buyer: Address,
    pub total: i128,
    pub timestamp: u64,
    pub status: OrderStatus,
}

// Order details (stored separately to optimize storage)
#[contracttype]
#[derive(Clone)]
pub struct OrderDetails {
    pub delivery_info: String,
    pub product_ids: Vec<String>,
    pub product_names: Vec<String>,
    pub prices: Vec<i128>,
    pub quantities: Vec<i128>,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Owner,
    OrderCounter,
    Order(u64),           // Order basic data
    OrderDetails(u64),    // Order full details
    TokenAddress,         // Address of the payment token (e.g., USDC)
}

#[contract]
pub struct ChowFastOrder;

#[contractimpl]
impl ChowFastOrder {
    /// Initialize contract with owner and payment token
    pub fn init(env: Env, owner: Address, token_address: Address) {
        if env.storage().instance().has(&DataKey::Owner) {
            panic!("Already initialized");
        }
        
        owner.require_auth();
        
        env.storage().instance().set(&DataKey::Owner, &owner);
        env.storage().instance().set(&DataKey::OrderCounter, &0u64);
        env.storage().instance().set(&DataKey::TokenAddress, &token_address);
    }

    /// Create order - buyer pays via token transfer
    pub fn create_order(
        env: Env,
        buyer: Address,
        item_product_ids: Vec<String>,
        item_product_names: Vec<String>,
        item_prices: Vec<i128>,
        item_quantities: Vec<i128>,
        subtotal: i128,
        delivery_info: String,
    ) -> u64 {
        buyer.require_auth();

        // Validation
        if item_product_ids.is_empty() {
            panic!("No items");
        }

        if item_product_ids.len() != item_product_names.len()
            || item_product_ids.len() != item_prices.len()
            || item_product_ids.len() != item_quantities.len()
        {
            panic!("Array length mismatch");
        }

        if subtotal <= 0 {
            panic!("Zero or negative subtotal");
        }

        if delivery_info.is_empty() {
            panic!("No delivery info");
        }

        // Calculate total
        let total_amount = subtotal + TRANSACTION_FEE;

        // Transfer tokens from buyer to contract
        let token_address: Address = env.storage().instance().get(&DataKey::TokenAddress).unwrap();
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&buyer, &env.current_contract_address(), &total_amount);

        // Increment counter
        let mut counter: u64 = env.storage().instance().get(&DataKey::OrderCounter).unwrap_or(0);
        counter += 1;
        env.storage().instance().set(&DataKey::OrderCounter, &counter);

        let new_order_id = counter;
        let timestamp = env.ledger().timestamp();

        // Store order data
        let order = Order {
            buyer: buyer.clone(),
            total: total_amount,
            timestamp,
            status: OrderStatus::Paid,
        };

        let order_details = OrderDetails {
            delivery_info: delivery_info.clone(),
            product_ids: item_product_ids.clone(),
            product_names: item_product_names.clone(),
            prices: item_prices.clone(),
            quantities: item_quantities.clone(),
        };

        env.storage().persistent().set(&DataKey::Order(new_order_id), &order);
        env.storage().persistent().set(&DataKey::OrderDetails(new_order_id), &order_details);

        // Emit event
        env.events().publish(
            (symbol_short!("order_new"), new_order_id),
            (buyer.clone(), total_amount, timestamp),
        );

        new_order_id
    }

    /// Update status (owner only)
    pub fn update_order_status(env: Env, order_id: u64, new_status: OrderStatus) {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        owner.require_auth();

        let counter: u64 = env.storage().instance().get(&DataKey::OrderCounter).unwrap_or(0);
        if order_id == 0 || order_id > counter {
            panic!("Order not found");
        }

        let mut order: Order = env.storage().persistent().get(&DataKey::Order(order_id)).unwrap();

        if order.status == OrderStatus::Cancelled {
            panic!("Order cancelled");
        }

        order.status = new_status;
        env.storage().persistent().set(&DataKey::Order(order_id), &order);

        // Emit event
        env.events().publish(
            (symbol_short!("status"), order_id),
            new_status,
        );
    }

    /// Cancel order (buyer only, 5 min window)
    pub fn cancel_order(env: Env, order_id: u64) {
        let counter: u64 = env.storage().instance().get(&DataKey::OrderCounter).unwrap_or(0);
        if order_id == 0 || order_id > counter {
            panic!("Order not found");
        }

        let mut order: Order = env.storage().persistent().get(&DataKey::Order(order_id)).unwrap();
        
        order.buyer.require_auth();

        if order.status != OrderStatus::Paid {
            panic!("Can only cancel paid orders");
        }

        // Check 5 minute window
        let current_time = env.ledger().timestamp();
        let time_diff = current_time.saturating_sub(order.timestamp);

        if time_diff > FIVE_MINUTES {
            panic!("Cancellation time expired");
        }

        // Update status
        order.status = OrderStatus::Cancelled;
        env.storage().persistent().set(&DataKey::Order(order_id), &order);

        // Refund tokens to buyer
        let token_address: Address = env.storage().instance().get(&DataKey::TokenAddress).unwrap();
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&env.current_contract_address(), &order.buyer, &order.total);

        // Emit event
        env.events().publish(
            (symbol_short!("cancel"), order_id),
            order.buyer.clone(),
        );
    }

    /// Withdraw balance (owner only)
    pub fn withdraw(env: Env) {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        owner.require_auth();

        let token_address: Address = env.storage().instance().get(&DataKey::TokenAddress).unwrap();
        let token_client = token::Client::new(&env, &token_address);
        
        let balance = token_client.balance(&env.current_contract_address());

        if balance <= 0 {
            panic!("No funds to withdraw");
        }

        token_client.transfer(&env.current_contract_address(), &owner, &balance);

        // Emit event
        env.events().publish(
            (symbol_short!("withdraw"),),
            (owner, balance),
        );
    }

    /// Transfer ownership
    pub fn transfer_ownership(env: Env, new_owner: Address) {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        owner.require_auth();
        
        new_owner.require_auth();

        env.storage().instance().set(&DataKey::Owner, &new_owner);
    }

    /// Get owner
    pub fn get_owner(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Owner).unwrap()
    }

    /// Get total orders
    pub fn get_total_orders(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::OrderCounter).unwrap_or(0)
    }

    /// Get order basic info
    pub fn get_order(env: Env, order_id: u64) -> Order {
        env.storage().persistent().get(&DataKey::Order(order_id)).unwrap()
    }

    /// Get order details
    pub fn get_order_details(env: Env, order_id: u64) -> OrderDetails {
        env.storage().persistent().get(&DataKey::OrderDetails(order_id)).unwrap()
    }

    /// Get token address
    pub fn get_token_address(env: Env) -> Address {
        env.storage().instance().get(&DataKey::TokenAddress).unwrap()
    }
}