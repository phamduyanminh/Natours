const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //Always have to config dotenv before others
const app = require('./app');

// Start server - Port number
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});