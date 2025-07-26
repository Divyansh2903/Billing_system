import { Order } from '../db/index.js'; 



export async function handlePaymentSuccess(payment) {
    try {
        console.log("PAYMENT", JSON.stringify(payment, null, 2));
        const order = await Order.findOne({
            orderId: payment.order_id
        });

        if (order) {
            order.paymentStatus = 'paid';
            order.paymentMethod = payment.method;
            order.totalAmount = payment.amount;
            order.orderDate = new Date(payment.created_at * 1000);

            await order.save();
            console.log("HOGYA")
        }
    } catch (error) {
        console.error('Error handling payment captured:', error);
    }
}

export async function handlePaymentFailed(payment) {
    try {
        const order = await Order.findOne({
            razorpayOrderId: payment.order_id
        });

        if (order) {
            order.paymentStatus = 'failed';
            order.failureReason = payment.error_description;
            await order.save();
        }
    } catch (error) {
        console.error('Error handling payment failed:', error);
    }
}