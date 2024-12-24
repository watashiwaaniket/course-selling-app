const { Router } = require('express');
const courseRouter = Router();

courseRouter.post('/purchase', function(req, res){
    res.json({
        message: "buying a course"
    })
})

courseRouter.get('/preview', function(req, res){
    res.json({
        message : "previewing all the available courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}
