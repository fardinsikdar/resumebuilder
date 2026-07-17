require('dotenv').config(); // Loads environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const ENVIRONMENT = process.env.CASHFREE_ENVIRONMENT || "sandbox";

const CASHFREE_URL = ENVIRONMENT === "production" 
  ? "https://api.cashfree.com/pg/orders" 
  : "https://sandbox.cashfree.com/pg/orders";

app.post('/create-order', async (req, res) => {
    try {
        const { email, phone } = req.body;
        const uniqueOrderId = "ORD_" + Date.now();
        const cleanPhone = phone ? phone.replace(/[^0-9]/g, "").slice(-10) : "9999999999";

        console.log(`[System Log] Initiating order creation sequence for ID: ${uniqueOrderId}`);

        const response = await axios.post(CASHFREE_URL, {
            order_amount: 9.00, // Matches frontend advertised price of ₹9
            order_currency: "INR",
            order_id: uniqueOrderId,
            customer_details: {
                customer_id: "CUST_" + Date.now(),
                customer_phone: cleanPhone, 
                customer_email: email || "customer@example.com"
            },
            order_meta: {
                return_url: process.env.CASHFREE_RETURN_URL
            }
        }, {
            headers: {
                'x-client-id': CLIENT_ID,
                'x-client-secret': SECRET_KEY,
                'x-api-version': '2022-09-01',
                'Content-Type': 'application/json'
            }
        });

        console.log("Cashfree Raw Response API Payload:", response.data);

        if (response.data && response.data.payment_session_id) {
            res.json({ payment_session_id: response.data.payment_session_id });
        } else {
            res.status(400).json({ error: "Missing token assignment parameters" });
        }

    } catch (error) {
        console.error("Cashfree Network Pipeline Crash Logged:");
        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
        res.status(500).json({ error: "Internal server data transaction loop failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));