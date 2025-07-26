const { Order } = require("../db");

async function getDashboardData() {
    const allOrders=await Order.find();
    return allOrders;
    
}

module.exports={
    getDashboardData
}