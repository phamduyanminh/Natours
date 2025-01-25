const app = require('./app');

// Start server - Port number
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});