const crypto = require("crypto");
const { handlePaymentSuccess, handlePaymentFailed } = require("../utils/paymentHandlers");

async function verifyPayment(body, headers) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = headers['x-razorpay-signature'];

    //scret verification
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return { success: false, message: "Invalid signature" };
    }

    const event = JSON.parse(body);
    console.log("EVENT" + event)


    switch (event.event) {
      case 'payment.captured':
        await handlePaymentSuccess(event.payload.payment.entity);
        break;
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      default:
        console.log('Unhandled event:', event.event);
    }

    return { status: 'ok' }
  } catch (error) {
    console.error('Webhook error:', error);
    throw new Error('Webhook error: ' + error.message);
  }

}



module.exports = { verifyPayment };






// module.exports={verifyPayment}