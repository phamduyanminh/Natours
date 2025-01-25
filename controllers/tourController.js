const express = require('express');
const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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