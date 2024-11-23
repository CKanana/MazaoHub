import request from "request";
import 'dotenv/config';
import getTimestamp from '../utils/timestamp.js'; // Adjust to the correct name
import ngrok from 'ngrok';

// @desc initiate stk push
// @method POST
// @route /stkPush
// @access public
export const initiateSTKPush = async (req, res) => {
    try {
        const { amount, phone, Order_ID } = req.body;
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + req.safaricom_access_token;

        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');

        const callback_url = await ngrok.connect(process.env.PORT);
        const api = ngrok.getApi();
        await api.listTunnels();

        console.log("callback ", callback_url);
        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": phone,
                    "PartyB": process.env.BUSINESS_SHORT_CODE,
                    "PhoneNumber": phone,
                    "CallBackURL": `${callback_url}/api/stkPushCallback/${Order_ID}`,
                    "AccountReference": "Wamaitha Online Shop",
                    "TransactionDesc": "Paid online"
                }
            },
            function (e, response, body) {
                if (e) {
                    console.error(e);
                    res.status(503).send({
                        message: "Error with the stk push",
                        error: e
                    });
                } else {
                    res.status(200).json(body);
                }
            }
        );
    } catch (e) {
        console.error("Error while trying to create LipaNaMpesa details", e);
        res.status(503).send({
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        });
    }
};

// @desc STK Push Callback
// @method POST
// @route /stkPushCallback/:orderId
// @access public
export const stkPushCallback = async (req, res) => {
    // Your callback logic here
    const orderId = req.params.orderId;
    console.log("STK Push Callback received for order ID:", orderId);
    // Process the callback data here
    res.status(200).send({ message: "Callback processed successfully" });
};