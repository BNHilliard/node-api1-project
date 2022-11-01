// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json()) //important middleware!


server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "The user information could not be retrieved", 
            err: err.message, 
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if (!user) { res.status(404).json({
        message: "The user with the specified ID does not exist" })
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json('Internal Server Error')
    })
})

server.post('/api/users', (req, res) =>{
    User.insert(req.body)
    .then(result => {
        if (req.body.name == null || req.body.bio == null) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else { res.status(201).json(result)}
    }).catch(error => {
        res.json(error)
    })
    
})


server.put('/api/users/:id', async (req, res) => {
    try {    
        const pUser = await User.findById(req.params.id)
        if (!pUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                if(!req.body.name  || !req.body.bio) { 
                    res.status(400).json({ message: "Please provide name and bio for the user"})
                } else  {
                    const updatedUser = await User.update(req.params.id, req.body)
                    res.status(200).json(updatedUser)
                } }
            
            }  catch (err)  {
        res.status(500).json({
            message: "The user information could not be modified", 
            err: err.message, 
            stack: err.stack
        })
    }
        })






server.delete('/api/users/:id', async (req, res) => {
    const pUser = await User.findById(req.params.id)
        if (!pUser) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
            } else { 
                const deletedUser = await User.remove(pUser.id)
                res.status(200).json(deletedUser)     }
            })



server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
