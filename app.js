//How to run nodemon: https://stackoverflow.com/questions/35530930/nodemon-not-working-bash-nodemon-command-not-found

const fs = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTour = (req, res) => {
    console.log(req.params)

    const id = req.params.id * 1 //Automatically convert string to number value
    const tour = tours.find(element => element.id === id)
    if(!tour) return res.status(404).json({
        status: 'Fail!',
        message: 'No tour found!'
    })
    
    res.status(200).json({
        status: 'Retrieve tour success',
        result: id,
        data: {
            tour: tour
        }
    })
};

const createTour = (req, res) => {
    const newId = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'Add new tour success',
            data: {
                tour: newTour
            }
        })
    })

    console.log(newTour)
    console.log('Done with posting')
};

const updateTour = (req, res) => {
    console.log(req.params)

    if(req.params.id * 1 > tours.length) return res.status(404).json({
        status: 'Fail!',
        message: 'No tour found to update!'
    })

    res.status(200).json({
        status: 'Update tour success',
        data: {
            tour: '<Updated tour here ...>'
        }
    })
};

const deleteTour = (req, res) => {
    console.log(req.params)

    if(req.params.id * 1 > tours.length) return res.status(404).json({
        status: 'Fail!',
        message: 'No tour found to update!'
    })

    res.status(200).json({
        status: 'Delete tour success',
        data: {
            tour: '<Deleted tour here ...>'
        }
    })
};


//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});