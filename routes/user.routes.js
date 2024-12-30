const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userMiddleware } = require('../middlewares/user');
require('dotenv').config();


userRouter.post('/signup', async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);

    await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName       
    });

    res.json({
        message: "You are signed up!"
    })
})
 
userRouter.post('/login', async function(req, res){
    const { email, password } = req.body;
    const response = await userModel.findOne({
        email: email,
    })

    if(bcrypt.compareSync(password, response.password.toString())){
        const token = jwt.sign({
            id: response._id.toString()
        }, process.env.JWT_USER_PASSWORD);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Creds"
        })
    }
})
 
userRouter.get('/purchases', userMiddleware, function(req, res){
    res.json({
        message : "showing purchased courses"
    })
})

module.exports = {
    userRouter: userRouter
}