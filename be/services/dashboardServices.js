import { PrismaClient } from "../generated/prisma";

const { Order } = require("../db");

const prisma=new PrismaClient();
async function getDashboardData() {
    // const allOrders=await Order.find();
    const allOrders=await prisma.order.findMany();
    console.log(allOrders);
    return allOrders;
    
}

export default{
    getDashboardData
}