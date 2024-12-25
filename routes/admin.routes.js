const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



adminRouter.post('/signup',async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);

    await adminModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName       
    });

    res.json({
        message: "You are signed up!"
    })

});

adminRouter.post('/signin',async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    const response = await adminModel.findOne({
        email: email,
        firstName: firstName,
        lastName: lastName
    })

    if(bcrypt.compareSync(password, response.password.toString())){
        const token = jwt.sign({
            id: response._id.toString()
        }, process.env.JWT_ADMIN_PASSWORD);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Creds"
        })
    }
});

adminRouter.post('/course', function(req, res){
    res.json({
        message: "course post endpoint"
    })
})

adminRouter.put('/course', function(req, res){
    res.json({
        message: "course put endpoint"
    })
})

adminRouter.get('/course/bulk', function(req, res){
    res.json({
        message: "course get endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}