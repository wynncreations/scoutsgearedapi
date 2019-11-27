const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.EMAIL_KEY);

router.post('/register',(req,res,next)=>{
    var password = req.body.password;
    //console.log(`Password  -  ${req.body.password}`);
    const saltRounds = 10;
    //console.log(req.body);
    //check for existing username
    User.find({username: req.body.username},(err,user)=>{
        
        if(err){
            console.log(`Error finding user, error - ${err}`);
        }
        if(user.username === req.body.username){
            res.send("User already exists.");
        }else{//no error,and user doesn't exist. Lets verify info and create the user.
            //console.log(req.body);
            if(req.body.password === "" ||  req.body.password.length < 8){
                res.send("Password required and must be over 8 characters or more.");
            }else{
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    //hashed, lets save the user.
                    var user = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        password: hash,
                        created_at: Date(),
                        updated_at: Date(),
                        account_type: req.body.account_type || 'Parent',
                        unit_ID: req.body.unit_ID || '000000000000000000000000',
                        position: req.body.position || 'None',
                        isParent: req.body.isParent || true
                    });
                    user.save((err)=>{
                        if(err){
                            res.status("400").send(`Error saving user - ${err}`);
                        }else{


                            const msg = {
                                to: req.body.username,
                                cc: 'robert+scoutsgearedadmin@wynnoutfitters.com', //Admin account
                                from: 'robert@wynnoutfitters.com',
                                templateId: 'd-5c02efff7f414146b391b578900eff73',
                                    dynamic_template_data: {
                                        subject: `Welcome to ScoutsGeared!`,
                                        firstname: req.body.firstname
                                    },
                            };
                            const status = sgMail.send(msg,()=>{
                                console.log(`Created account ${user}`);
                                res.status("200").send(`Account created successfully.`);
                            });
                            
                        }  
                    });
                });
            }
        }
    });
});

router.post('/login',(req,res,next)=>{
    var password = req.body.password;
    const saltRounds = 10;
    var username = req.body.username;

    //search for the username, if we get someone then compare the stored hash to the new pw after hasing it.
    //if we dont find the user return error, if the pws dont match return error.

    User.find({username:username},(err,foundUser)=>{
        if(err){
            res.status('400').send(`Error finding user by username ${err}`);
        }else{
            let user = foundUser[0];//Get the first(should be only) user found

            bcrypt.compare(password,user.password,(err,passwordMatched)=>{
                if(err){
                    res.status('400').send(`Error comparing passwords ${err}`);
                }else if(passwordMatched){
                    //passwords matched so we need to return a session and some user data
                    bcrypt.genSalt().then(rndHash=>{
                        bcrypt.hash("SESSION",rndHash).then(token =>
                            res.send({token:token,me:user}));
                    });
                }else{
                
                    res.status('400').send("Password doesn't match")
                }
            });
        }
    });
});

router.get('/:id',(req,res,next)=>{
    User.findOne({id:req.params.id},(err,user)=>{
        if(err){
            res.status(400).send(`Error - ${err}`);
        }else{
            
            res.status(200).send({user:user});
        }
    });
});

router.post('/joinunit/',(req,res,next)=>{
    let id = req.body.id
    User.findById(req.body.id,(err,user)=>{
        if(err){
            res.status(400).send(`Error - ${err}`);
        }else{
            user.unit_ID = req.body.unit_id;
            user.save((err)=>{
                if(err){
                    res.status(400).send(`Error - ${err}`);
                }else{
                    User.findById(
                        id
                    , (err, user) => {
                        if (err) {
                            res.status(400).send(`Error - ${err}`);
                        } else {
                            //console.log(user)
                            res.status(200).send({user:user});
                        }
                    })
                }
            });
            
        }
    })
});

module.exports = router;