//How to run nodemon: https://stackoverflow.com/questions/35530930/nodemon-not-working-bash-nodemon-command-not-found

const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});