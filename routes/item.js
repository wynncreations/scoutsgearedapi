const express = require('express');
router = express.Router();
const Item = require('../models/item');

//Get an item by ID
router.get('/:id',(req,res,next)=>{
    Item.findOne({_id:id},(err,foundItem)=>{
        if(err){
            res.status(400).send(`Error -  ${err}`)
        }else{
            res.status(200).send({item:foundItem});
        }
    });
});

//Get all items by unit id.
router.get('/unit/:id',(req,res,next)=>{
    Item.find({unit_ID:req.params.id},(err,foundItems)=>{
        if (err) {
            res.status(400).send(`Error -  ${err}`)
        } else {
            res.status(200).send({
                items: foundItems
            });
        }
    });
});

//Get all items by a category
router.get('/category/:category/unit/:id',(req,res,next)=>{
    Item.find({category:category, unit_ID: req.params.id},(err,foundItems)=>{
        if (err) {
            res.status(400).send(`Error -  ${err}`)
        } else {
            console.log(JSON.stringify(foundItems));
            res.status(200).send({
                item: foundItems
            });
        }
    });
});

//Create item
router.post('/add',(req,res,next)=>{
    var item = new Item({
        name : req.body.name,
        category : req.body.category,
        retail_cost : req.body.retail_cost,
        active_discount : false,
        active_discount_value : 0.00,
        factory_url : req.body.factory_url,
        image_url : req.body.image_url,
        description : req.body.description,
        unit_ID: req.body.unit_id
    });
    item.save((err)=>{
        if(err){
            res.status(400).send(`Error saving item - ${err}`);
        }else{
            res.status(200).send(`Successfully added - ${JSON.stringify(item)}`);
        }
    });
});










module.exports = router;