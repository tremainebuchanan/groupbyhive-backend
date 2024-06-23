const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = process.env.FIREBASE_URL;
const firebaseKey = process.env.FIREBASE_KEY

router.post('/', async function(req, res){
    const credentials = req.body;
    axios.post(`${baseUrl}signInWithPassword?key=${firebaseKey}`, credentials)
        .then((response) => {
            res.json(response.data);
        }).catch((error) => {
            res.json(error);
    })
});
module.exports = router;