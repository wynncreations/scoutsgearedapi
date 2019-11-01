const express = require('express');
router = express.Router();
const Category = require('../models/category');

//Get all categories by unit ID
router.get('/:id',(req,res,next)=>{
    Category.find({unit_id: req.params.id},(err,categories)=>{
        if (err) {
            res.status(400).send(`Error - ${err}`);
        } else {
            res.status(200).send({
                categories: categories
            });
        }
    })
});

router.post('/add',(req,res,next)=>{
    var category = new Category({
        label : req.body.label,
        unit_id: req.body.unit_id
    });

    console.log(JSON.stringify(category));

    category.save((err)=>{
        if(err){
            res.status(400).send(`error saving category - ${err}`);
        }else{
            res.status(200).send(`Successfully saved category - ${JSON.stringify(category)}`)
        }
    });
});


module.exports = router;