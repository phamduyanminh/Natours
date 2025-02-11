const Tour = require('../models/tourModel');


/**
 * We don't have to check Id and checkBody anymore since we use mongoose
 * For reference, go to tourRoutes.js to see how we call and check Id & checkBody
 * Code in tourRoutes.js: router.param('id', tourController.checkID);
 */
// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`)
//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status: 'Fail!',
//             message: `No tour ${val} found!`
//         })
//     }
//     console.log(`Tour id ${val} is valid`)
//     next()
// };

// exports.checkBody = (req, res, next) => {
//     console.log(`Tour Name: ${req.body.name} - Price: ${req.body.price}`)
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status: 'Fail!',
//             message: 'Missing name or price!'
//         })
//     }
//     next()
// }

// Create a new tour
exports.createTour = async (req, res) => {
    try{
        const newTour = await Tour.create(req.body);
        console.log(req.body)
        res.status(201).json({
            status: 'Add new tour success',
            data: {
                tour: newTour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: 'Fail!',
            message: err
        })
    }
    console.log('Done with creating new tour')
};

// Retrieve all tours
exports.getAllTours = async (req, res) => {
    try{
        const tours = await Tour.find()
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'Fail!',
            message: err
        })
    }
};

// Retrieve a tour with ID
exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: `Retrieve tour ${req.params.id} success`,
            data: {
                tour: tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'Fail!',
            message: err
        })
    }
};

// Update a tour with ID
exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: `Update tour ${req.params.id} success`,
            data: {
                tour: tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'Fail!',
            message: err
        })
    }
};

// Delete a tour with ID
exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: `Delete tour ${req.params.id} success`,
        data: {
            tour: '<Deleted tour here ...>'
        }
    })
};