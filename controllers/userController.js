const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function getAllUser (req, res){
    User.find().then(data =>{
        res.send({
            msg: 'data Found',
            data: data
        })
    })
    .catch(err =>{
        res.send(err)
    })
}


function getUserById (req, res){
    User.findOne({
        _id: req.params.id
    })
    .then(data =>{
        res.send({
            msg: 'data found',
            data: data
        })
    })
    .catch(err =>{
        res.send(err)
    })
}


function deleteUser(req, res){
    User.remove({
        _id: req.params.id
    })
    .then(data =>{
        res.send({
            msg: 'data removed',
            data: data
        })
    })
    .catch(err =>{
        res.send(err)
    })
}

function editUser(req, res){
    User.update({
        _id:req.params.id
    },{
        name: req.body.name,
        username: req.body.name
    })
    .then(data =>{
        res.send({
            msg: 'data update',
            data: data
        })
    })
    .catch(err =>{
        res.send(err)
    })
}


// sigup
let signup = (req,res)=>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password,salt)
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        role: 'admin'
    })
    .then(data =>{
        res.send({
            msg: 'data created',
            data: data
        })
    })
    .catch(err =>{
        res.send(err)
    })
} 


// signin 
let signin = (req,res) =>{
    User.findOne({
        username: req.body.username
    })
    .then(data => {
        // if(data == null){
        //     res.send({
        //         msg: 'username not found'
        //     })
        // }
        
            if(bcrypt.compareSync(req.body.password, data.password)){
                let token = jwt.sign({
                    id: data._id,
                    name:data.name,
                    username: data.username,
                    role: data.role
                },process.env.JWT_SECRET)
                res.send(token)
            }
            else {
                res.send({
                    msg: 'password incorrect'
                })
            }
    
    })
    .catch(err =>{
        res.send(err)
    })
}

// create USER 
let createUser = (req,res)=>{
    let salt = bcrypt.genSaltSync(10)
    let has = bcrypt.hashSync(req.body.password, salt)

    User.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        role: req.body.role
    })
    .then(data =>{
        res.send({
            msg: 'data created',
            data: data
        })
    })
    .cath(err =>{
        res.send(err)
    })
}


module.exports = {
    getAllUser,
    getUserById,
    deleteUser,
    editUser,
    signin,
    signup,
    createUser
}