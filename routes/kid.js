const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Kid = require('../models/kids');

router.post('/add', (req, res, next) => {
    //console.log(`First Name - ${req.body.firstname}`);
    //console.log(`Parent - ${req.body.parent}`);
    Kid.find({firstname:req.body.firstname,parent:req.body.parent},(err,kid)=>{
        //get first found kid.
        //console.log(kid1.firstname);
        if(err){
            res.status('400').send(`Error finding scouts! - ${err}`);
        }else{
            if(kid.length>0){
                kid1 = kid[0]
                res.status(500).send();
            
            }else{
                //no kid found, lets add them.
                var kid = new Kid({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                    created_at: Date(),
                    updated_at: Date(),
                    unit_ID: req.body.unit_id,
                    subUnitType: req.body.den,
                    subUnitID: req.body.den_id,
                    parent: req.body.parent,
                    fundRaised: 0.00,
                    profit: 0.00,
                    scoutFund: 0.00,
                });

                kid.save((err)=>{
                    if(err){
                        res.status('400').send(`Error saving scout! - ${err}`);
                    }else{
                        if(kid.parent){
                            Kid.find({
                                    parent: kid.parent
                                })
                                .populate({
                                    path: "parent"
                                })
                                .exec((err, foundKids) => {
                                    if (err) {
                                        res.status(500).send(`Error - ${err}`);
                                    } else {
                                        //console.log(foundKids[0].parent.username)
                                        res.status(200).send({
                                            scouts: foundKids
                                        })
                                    }
                                })
                        }

                        
                    }
                });

            }
        }
    });
});


router.get('/:id', (req, res, next) => {
    console.log(req.params.id)
    Kid.find({
        parent: req.params.id
    }, (err, foundKids) => {
        if (err) {
            res.status('500').send(`Error finding kids! - ${err}`);
        } else {
            console.log(foundKids)
            res.status('200').send({
                
                scouts: foundKids
            });
        }

    });
});

//Get all scouts for a unit by unit_ID //also attaches parent and unit info
router.get('/all/:id',(req,res,next)=>{
    Kid
    .find({unit_ID:req.params.id})
    .populate({
        path: "parent",
        select: "-password"
    })
    .exec((err, foundKids) => {
        if (err) {
            res.status(500).send(`Error - ${err}`);
        } else {
            //console.log(foundKids[0].parent.username)
            res.status(200).send({
                scouts: foundKids
            })
        }
    })
});



router.get('/scout/:id',(req,res,next)=>{
    Kid
        .find({
            _id: req.params.id
        })
        .populate({
            path: "parent",
            select: "-password"
        })
        .exec((err, foundKids) => {
            if (err) {
                res.status(500).send(`Error - ${err}`);
            } else {
                //console.log(foundKids[0].parent.username)
                console.log(JSON.stringify(foundKids));
                res.status(200).send({
                    scout: foundKids
                })
            }
        })
});


router.get('/scout/parent/:parent_id', (req, res, next) => {
    Kid
        .find({
            parent: req.params.parent_id
        })
        .populate({
            path: "parent",
            select: "-password"
        })
        .exec((err, foundKids) => {
            if (err) {
                res.status(500).send(`Error - ${err}`);
            } else {
                //console.log(foundKids[0].parent.username)
                console.log(JSON.stringify(foundKids));
                res.status(200).send({
                    scouts: foundKids
                })
            }
        })
});






module.exports = router;