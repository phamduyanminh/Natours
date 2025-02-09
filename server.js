const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //Always have to config dotenv before others
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!');
}); 


// Creating mongoose schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name!'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price!']
    },
});

const Tour = mongoose.model('Tour', tourSchema);

// Start server - Port number
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});