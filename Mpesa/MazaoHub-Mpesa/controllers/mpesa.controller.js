import request from 'request';
import { getTimestamp } from '../utils/timestamp.js';

export const initiateSTKPush = async (req, res) => {
    try {
        const { amount, phone, Order_ID } = req.body;
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + req.safaricom_access_token;
        const timestamp = getTimestamp();
        const password = Buffer.from(
            process.env.BUSINESS_SHORT_CODE + 
            process.env.PASS_KEY + 
            timestamp
        ).toString('base64');

        const requestBody = {
            BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone,
            PartyB: process.env.BUSINESS_SHORT_CODE,
            PhoneNumber: phone,
            CallBackURL: `${process.env.BASE_URL}/api/stkPushCallback/${Order_ID}`,
            AccountReference: "MazaoHub",
            TransactionDesc: "Payment for order"
        };

        request({
            url,
            method: "POST",
            headers: { Authorization: auth },
            json: requestBody
        }, (error, response, body) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Error with the STK push",
                    error: error.message
                });
            }
            res.status(200).json(body);
        });
    } catch (error) {
        console.error("Error in STK push:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const stkPushCallback = async (req, res) => {
    try {
        const { Order_ID } = req.params;
        const { Body: { stkCallback } } = req.body;

        if (!stkCallback.CallbackMetadata) {
            console.log('Payment failed');
            return res.json({ 
                status: 'FAILED',
                OrderId: Order_ID 
            });
        }

        const metadata = stkCallback.CallbackMetadata.Item;
        const paymentData = {
            OrderId: Order_ID,
            Amount: metadata.find(item => item.Name === 'Amount').Value,
            MpesaReceiptNumber: metadata.find(item => item.Name === 'MpesaReceiptNumber').Value,
            TransactionDate: metadata.find(item => item.Name === 'TransactionDate').Value,
            PhoneNumber: metadata.find(item => item.Name === 'PhoneNumber').Value
        };

        console.log('Payment successful:', paymentData);
        res.json({ status: 'SUCCESS', data: paymentData });
    } catch (error) {
        console.error('Callback error:', error);
        res.status(500).json({ 
            status: 'ERROR',
            message: error.message 
        });
    }
};