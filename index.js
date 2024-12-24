const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()


app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);


async function main(){
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    app.listen(3000, () => {
        console.log('Server is listening on port 3000')
    })
}

main()