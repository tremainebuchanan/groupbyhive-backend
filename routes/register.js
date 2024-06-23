const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = process.env.FIREBASE_URL;
const firebaseKey = process.env.FIREBASE_KEY

router.post('/', async function(req, res){
    const user = req.body;
    axios.post(`${baseUrl}signUp?key=${firebaseKey}`, user)
        .then((response) => {
        verifyEmail(response.data.idToken);
        res.json(response.data);
    }).catch((error) => {
        res.json(error);
    })
});

async function verifyEmail(idToken){
    axios.post(`${baseUrl}sendOobCode?key=${firebaseKey}`, {
        requestType: 'VERIFY_EMAIL',
        idToken
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = router;