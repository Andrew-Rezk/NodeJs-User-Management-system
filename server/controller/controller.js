const { response } = require('express');
var userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validate request 
    if (!req.body){
        res.status(400).send({message: "content can not be empty!"});
        return;
    }

    //new user
    const user = new userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                mesage:err.message||"Some error occured while creating a create operation"
            });
        });
}

//retrieve and return all users/retrieve return a single user
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;

        userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({
                        message: `No user found with id ${id}`
                    })
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message: `Error retrieving user with id {id}`
                })
            })
    }else{
        userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                mesage:err.message||"Error occured while retrieving user information"
            })
        })
    }
}

//update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({
                message:"Data to update can not be empty"
            })
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update user with ${id}.`
                })
            }else{
               res.send(data) 
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update user ifnormation"
            });
        });
}

//delete a user with specified user id in the request 
exports.delete = (req, res) => {
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({
                message: `Cannot delete user with id ${id}. Id many be wrong`
            })
        }else{
            res.send({
                message: "User was deleted successfuly"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: `Could not delete user with id ${id}.`
        });
    });
}