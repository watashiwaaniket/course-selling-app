const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middlewares/admin')
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


adminRouter.post('/course', adminMiddleware, async function(req, res){
    const { title, description, price, imageUrl, creatorId } = req.body;

    await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: creatorId
    });

    res.json({
        message: "Course Added successfully!"
    })

});

adminRouter.put('/course', function(req, res){

    res.json({
        message: "course put endpoint"
    })
})

adminRouter.get('/course/bulk',async function(req, res){
    const { creatorId } = req.body;

    const response = await courseModel.find({
        creatorId: creatorId
    })

    if(response){
        res.json(response)
    }else{
        res.status(403).json({
            message: "Course Not found."
        })
    }
});

adminRouter.delete('/course', async function(req, res){
    const { creatorId, title } = req.body;


    const response = await courseModel.deleteOne({
        creatorId: creatorId,
        title: title
    });

    if(response.deletedCount === 0){
        res.status(403).json({
            message: "Course Not Found!"
        })
    }    
    
    res.json({
        message: "The course have been deleted!"
    })

});

module.exports = {
    adminRouter: adminRouter
}