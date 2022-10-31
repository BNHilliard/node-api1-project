// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()


server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved", 
            err: err.message, 
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (!user) {
          res.status(404).json({
        message: "The user with the specified ID does not exist" })
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json('Internal Server Error')
    })
})

server.post('/api/users', (req, res) =>{
    Users.insert(req.params)
    .then(newUser => {
        console.log(newUser)
    })
    .catch(err => {
        if (!req.params.name || !req.params.bio)
        res.status(500).json('Internal Server Error')
    })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
