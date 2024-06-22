const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);

router.post('/create-session', async function(req, res, next) {
    const domain = process.env.APP_DOMAIN;
    const items = req.body;
    if(items?.length === 0){
        return res.status(404)
            .json({"sessionUrl": null, error: "An error occurred while processing your request."});
    }
    const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${domain}/success`,
        cancel_url: `${domain}/cancel`,
    });

    res.json({"sessionUrl": session.url});
});

router.get('/products', async function(req, res){
    const products = await stripe.products.list({
        limit: 4,
    });
    res.json(products);
});

module.exports = router;