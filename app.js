//How to run nodemon: https://stackoverflow.com/questions/35530930/nodemon-not-working-bash-nodemon-command-not-found

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!',
        app: 'Natours'
    })
});

app.post('/post', (req, res) => {
    res.send('You can post on this server')
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});