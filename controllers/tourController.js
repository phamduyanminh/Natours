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


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}


class APIFeatures{
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    // Filtering
    filter(){
        // Basic filtering
        const queryObj = {...this.queryString}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el => delete queryObj[el])

        // Advanced filtering
        let queryStr = JSON.stringify(queryObj) // convert object to string
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, matchString => `$${matchString}`) // implment regex too find match string symbol(gte, gt, lte, lt)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    // Sorting
    sort(){
        // split string into array, join array into string
        // allows us to sort by multiple fields at the same time
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('') 
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt') // set default sort to createdAt (newest tours) as default
        }
        return this
    }

    // Fields limiting
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v') // exclude (remove) __v field in mongodb as default, don't need to show it on client side
        }
        return this
    }

    // Pagination
    paginate(){
        const page = this.queryString.page * 1 || 1  // convert string to number, default page is 1
        const limit = this.queryString.limit * 1 || 10  // convert string to number, default limit is 10
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}


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
    //Execute query
    const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    const tours = await features.query 
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