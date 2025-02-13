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

// Start server - Port number
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});