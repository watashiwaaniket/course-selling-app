const { Router } = require('express');
const userRouter = Router();

userRouter.post('/signup', function(req, res){
    res.json({
     message : "signup route"
    })
})
 
userRouter.post('/login', function(req, res){
    res.json({
        message : "login route"
    })
})
 
userRouter.get('/purchases', function(req, res){
    res.json({
        message : "showing purchased courses"
    })
})

module.exports = {
    userRouter: userRouter
}