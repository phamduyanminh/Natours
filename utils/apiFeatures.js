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

module.exports = APIFeatures;