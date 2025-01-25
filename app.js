//How to run nodemon: https://stackoverflow.com/questions/35530930/nodemon-not-working-bash-nodemon-command-not-found

const express = require('express');
const morgan = require('morgan') //Development logging
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
};
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋')
    next()
});


// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);


module.exports = app;