const { default: solanaServices } = require("../services/solanaServices");



exports.createSolanaOrder = async (req, res) => {
    const { 
        orderId, 
        roomNumber, 
        reading, 
        unitsConsumed,
        fileName, 
        paymentStatus, 
        paymentMethod, 
        totalAmount, 
        txSignature, 
        failureReason 
    } = req.body;

    try {
        const order = await solanaServices.createSolanaOrder({
            orderId,
            roomNumber,
            reading,
            fileName,
            unitsConsumed,
            paymentStatus,
            paymentMethod,
            totalAmount,
            txSignature,
            failureReason
        });
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getSolanaPriceInINR = async (req, res) => {
    try {
        const rateInINR = await solanaServices.getSolanaPriceInINR();
        res.json(rateInINR);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
