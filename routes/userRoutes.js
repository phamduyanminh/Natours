const express = require('express');
const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);


const getAllUsers = (reg, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data:{
            users: users
        }
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}


const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(createUser)

userRouter.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = userRouter;