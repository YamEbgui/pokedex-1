const express = require('express');
const errorHandler = require('./errorHandler');
const fs = require("fs");
const userRelativePath = "./src/user" 

const userHandler =(request , response , next) =>{
    if(request.headers.user){
        if(!isUserExist(request.headers.user)){
            fs.mkdirSync(`${userRelativePath}/${request.headers.user}`)
        }
        next();
    }else{
        errorHandler(401 , response);
    }
}

const isUserExist = (user) =>{
    const usersName =fs.readdirSync(userRelativePath);
    for (let i = 0 ; i <usersName.length ; i++){
        if(usersName[i] === user){
            return true;
        }
    }
    return false;
}

module.exports = userHandler;