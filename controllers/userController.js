const express = require('express');
const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);


exports.getAllUsers = (reg, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data:{
            users: users
        }
    })
}

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'Error'
    })
}