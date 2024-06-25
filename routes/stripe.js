const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);
const crypto = require("crypto");
const { OrderService } = require('./orders/service')
const db = require("../utils/db");

router.post('/create-session', async function(req, res, next) {
    const domain = process.env.APP_DOMAIN;
    const requestBody = req.body;
    const items = requestBody.orderDetails;
    console.log(requestBody);
    if(items?.length === 0){
        return res.status(404)
            .json({"sessionUrl": null, error: "An error occurred while processing your request."});
    }
    const orderId = crypto.randomBytes(16).toString("hex");
    const message = await createOrder(requestBody.userId, 100.00, 1, orderId);
    const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${domain}/success?o=${orderId}`,
        cancel_url: `${domain}/cancel?o=${orderId}`,
    });
    //res.end();
    res.json({"sessionUrl": session.url});
});

router.get('/products', async function(req, res){
    const products = await stripe.products.list({
        limit: 4,
    });
    res.json(products);
});


async function createOrder(uid, total, stateId, id){
    let message = true;
    try{
        const [result] = await db.query(
            `INSERT INTO orders (id, customerId, stateId, total) VALUES (?, ?, ?, ?)`,
            {replacements: [id,uid,stateId,total]}
        );
    }catch (e) {
        console.log(e)
        message = false;
    }
    return message;
}



module.exports = router;