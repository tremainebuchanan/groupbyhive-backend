const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);

router.post('/create-session', async function(req, res, next) {
    const domain = process.env.APP_DOMAIN;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: "price_1PRgy2KRgHLbHvECrBbnVm6t",
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${domain}/success`,
        cancel_url: `${domain}/cancel`,
    });

    res.json({"sessionUrl": session.url});
});

module.exports = router;