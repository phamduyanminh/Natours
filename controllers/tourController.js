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
    // Build query
    // 1A) Basic filtering
    const queryObj = {...req.query}
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach(el => delete queryObj[el])

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj) // convert object to string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, matchString => `$${matchString}`) // implment regex too find match string symbol(gte, gt, lte, lt)

    let query = Tour.find(JSON.parse(queryStr))

    // 2) Sorting
    // split string into array, join array into string
    // allows us to sort by multiple fields at the same time
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join('') 
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt') // set default sort to createdAt (newest tours) as default
    }

    // 3) Field limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        query = query.select(fields)
    }else{
        query = query.select('-__v') // exclude (remove) __v field in mongodb as default, don't need to show it on client side
    }

    // 4) Pagination
    let page = req.query.page*1 || 1 // convert string to number, default page is 1
    let limit = req.query.limit*1 || 10 // convert string to number, default limit is 10
    let skip = (page-1)*limit
    query = query.skip(skip).limit(limit)
    // Handling error if the user select page that is not exist
    if(req.query.page){
        const numTours = await Tour.countDocuments()
        if(skip >= numTours){
            return res.status(404).json({
                status: 'Fail!',
                message: 'This page does not exist'
            })
        }
    }

    //Execute query
    const tours = await query
    //Send response
    try{
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
exports.deleteTour = async(req, res) => {
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id)
        if(tour){
            res.status(204).json({
                status: `Delete tour ${req.params.id} success`            
            })
        }else{
            console.error("Tour not found!")
            res.status(404).json({
                status: 'Fail!',
                message: 'Tour not found!'
            })
        }
    }catch(err){
        res.status(404).json({
            status: 'Fail!',
            message: err
        })
    }
};