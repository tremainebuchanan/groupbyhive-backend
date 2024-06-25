const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/', async function(req, res){
    const userId = req.query.uid;
    try{
        const [orders] = await db.query('SELECT * FROM orders WHERE customerId = :uid', {
            replacements: { uid: userId }
        });
        res.json(orders);
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error retrieving orders'});
    }
});

router.put('/:id', async function(req, res){
    const orderId = req.params.id;
    const { customerId, status } = req.body;
    let message = await updateOrder(orderId, customerId, status);
    res.json(message);
});

async function updateOrder(id, customerId, status){
    let message = true;
    try{
        const [result] = await db.query(
            `UPDATE orders SET stateId = ? WHERE id = ? AND customerId = ?`,
            {replacements: [status, id, customerId]}
        );
    }catch (e) {
        console.log(e)
        message = false;
    }
    return message;
}

router.post('/', async function(req, res){
    const { userId, orderDetails } = req.body;
    const total = 30.00;
    const state = "2";
    try{
        const [result] = await db.query(
            `INSERT INTO orders (customerId, stateId, total) VALUES (:userId, :state, :total)`,
            {replacements: {userId: userId, total: total, state: state}}
        );
        res.json({message: 'Order successfully created'});
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'An error occurred while processing your order'});
    }
});

module.exports = router;