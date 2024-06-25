const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = process.env.FIREBASE_URL;
const firebaseKey = process.env.FIREBASE_KEY

router.post('/', async function(req, res){
    const credentials = req.body;
    const response = await axios.post(`${baseUrl}signInWithPassword?key=${firebaseKey}`, credentials);
    console.log(response.data);
    return res.json(response.data);
        // .then((response) => {
        //     console.log(response.data);
        //     res.json(response.data);
        // }).catch((error) => {
        //     res.json(error);
    //})
});
module.exports = router;