const Tour = require('../models/tourModel');



// We don't have to check Id anymore since we use mongoose
// For reference, go to tourRoutes.js to see how we call and check Id
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

exports.checkBody = (req, res, next) => {
    console.log(`Tour Name: ${req.body.name} - Price: ${req.body.price}`)
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'Fail!',
            message: 'Missing name or price!'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    // res.status(200).json({
    //     status: 'success',
    //     results: tours.length,
    //     data: {
    //         tours: tours
    //     }
    // })
};

exports.getTour = (req, res) => {
    // res.status(200).json({
    //     status: `Retrieve tour ${req.params.id} success`,
    //     data: {
    //         tour: tours[req.params.id]
    //     }
    // })
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: 'Add new tour success',
        data: {
            // tour: '<New tour added here ...>'//newTour
        }
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