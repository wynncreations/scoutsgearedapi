const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Kid = require('../models/kids');

//return a single scout with no additional data attached
router.get('/:id', (req, res, next) => {
    Kid
        .findById(
            req.params.id
        )
        .exec((err, foundScout) => {
            if (err) {
                res.status(500).send(`Error - ${err}`);
            } else {
                //console.log(foundKids[0].parent.username)
                //console.log(JSON.stringify(foundScout));
                res.status(200).send({
                    scout: foundScout
                })
            }
        })
});

//return scout by id with parent data attached.
router.get('/:id/withParent', (req, res, next) => {
    Kid
        .findById(
            req.params.id
        )
         .populate({
             path: "parent",
             select: "-password"
         })
        .exec((err, foundScout) => {
            if (err) {
                res.status(500).send(`Error - ${err}`);
            } else {
                //console.log(foundKids[0].parent.username)
                //console.log(JSON.stringify(foundScout));
                res.status(200).send({
                    scout: foundScout
                })
            }
        })
});


router.post('/update',(req,res,next)=>{
    Kid.findOneAndUpdate({'_id':req.body._id},req.body,(err,doc)=>{
        if(err){
            console.log(err);
            res.status(500).send(`Error updating scout ${err}`);
        }else{
            console.log(JSON.stringify(doc));
            res.status(200).send({scout:doc});
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    console.log(req.params.id);
    var id = req.params.id;
    Kid.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log(err);
            res.status(500).send(`Error deleting ${err}`);
        }else{
            console.log(`Deleted ${id}`);
            res.status(200).send(`Deleted ${id}`);
        }
    });
});


module.exports = router;