import request from 'request';
import 'dotenv/config';

// auth.middleware.js

export const generateToken = () => {
    // Your token generation logic
  
  
    try {
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64');

        request(
            {
                url: url,
                headers: {
                    "Authorization": "Basic " + auth
                }
            },
            (error, response, body) => {
                if (error) {
                    console.error("Error fetching access token:", error.message);
                    return res.status(401).send({
                        "message": 'Something went wrong when trying to process your payment',
                        "error": error.message
                    });
                }

                if (response.statusCode === 200) {
                    const parsedBody = JSON.parse(body);
                    req.safaricom_access_token = parsedBody.access_token;
                    next();
                } else {
                    console.error("Failed to fetch access token:", body);
                    return res.status(response.statusCode).send({
                        "message": 'Failed to fetch access token from Safaricom',
                        "error": body
                    });
                }
            }
        );
    } catch (error) {
        console.error("Access token error ", error);
        return res.status(401).send({
            "message": 'Something went wrong when trying to process your payment',
            "error": error.message
        });
    }
};
