const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`)
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'Fail!',
            message: `No tour ${val} found!`
        })
    }
    console.log(`Tour id ${val} is valid`)
    next()
};

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
    res.status(200).json({
        status: `Retrieve tour ${req.params.id} success`,
        data: {
            tour: tours[req.params.id]
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
    res.status(200).json({
        status: `Update tour ${req.params.id} success`,
        data: {
            tour: '<Updated tour here ...>'
        }
    })
};

exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: `Delete tour ${req.params.id} success`,
        data: {
            tour: '<Deleted tour here ...>'
        }
    })
};