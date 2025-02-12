const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //Always have to config dotenv before others
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');



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

//Read JSON file
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf-8'));

//Import data into DB
const importData = async () => {
    try{
        await Tour.create(tours)
        console.log('Data successfully loaded!');
        process.exit();
    }catch(err){
        console.log(err);
    }
};

//Delete all data in the collection
const deleteData = async() => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        process.exit();
    }catch(err){
        console.log(err);
    }
};

/**
 * In terminal run the following commands to import or delete data into MongoDB Atlas:
 * node ./dev-data/dataimport-dev-data.js --import
 * node ./dev-data/dataimport-dev-data.js --delete
 */

// Explain `process.argv[2]`
// In the console.log will have 3 arguments: node, path to the file, and --import OR --delete
// It will take the second argument aka 3rd options in array
// Which is --import or --delete to trigger the corresponding function
if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);