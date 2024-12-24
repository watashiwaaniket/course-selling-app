const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');

adminRouter.post('/signup', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/signin', function(req, res){
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.post('/c', function(req, res){
    res.json({
        message: "course post endpoint"
    })
})

adminRouter.put('/', function(req, res){
    res.json({
        message: "course put endpoint"
    })
})

adminRouter.get('/bulk', function(req, res){
    res.json({
        message: "course get endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}