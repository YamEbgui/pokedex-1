const { query } = require('express');
const express = require('express');
const fs = require("fs");
const path = require("path");
const router = express.Router();
const userRelativePath = "./src/user" 

const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

router.post("",function(req , res){
    const userName ={
        username :  `${req.headers.user}`
    } 
    res.send(JSON.stringify(userName));
})
module.exports = router;
