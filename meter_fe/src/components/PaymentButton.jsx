import React from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api_consts';

const PaymentButton = ({roomNumber,reading,fileName}) => {

    const handlePayment = async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.CREATE_ORDER, {
                amount: 500,
                roomNumber: roomNumber,
                reading,
                fileName
            });

            const { id: order_id, amount, currency } = response.data.order;

            const options = {
                key: "rzp_test_3t0KgiMzM9w7Rv",
                amount: amount,
                currency: currency,
                name: "100X",
                description: "Electricity Bill Payment",
                order_id: order_id,
                prefill: {
                    name: "Divyansh Singh",
                    email: "sdivyansh001@gmail.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
                // No full-handler needed in wh
                handler: function (response) {
                    window.location.reload();
                }

            };

            const razorpayObject = new window.Razorpay(options);
            razorpayObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <button
            onClick={handlePayment}
            class="btn-primary"
        >
            <p>Save and Pay</p>
        </button>
    );
};

export default PaymentButton;
