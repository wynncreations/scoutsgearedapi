const express = require('express');
router = express.Router();
const Inventory = require('../models/inventory');

//default route provide all current inventory.
router.get('/',(req,res,next)=>{
    Inventory.find({},(err,inventory)=>{
        if(err){
            res.status('400').send({error:`Error finding inventory error - ${err}`});
        }
        res.status('200').send({inventory:inventory});//found inventory, return it.
    });
});


router.get('/category/:category',(req,res,next)=>{
    if(req.params.category === "All"){
        Inventory.find({
            
        }, (err, inventory) => {
            console.log(req.params.category);
            if (err) {
                res.status('400').send({
                    error: `Error finding inventory error - ${err}`
                });
            } else {
                res.status('200').send({
                    inventory: inventory
                }); //found inventory, return it.
            }
        });
    }else{
        Inventory.find({
            category: req.params.category
        }, (err, inventory) => {
            console.log(req.params.category);
            if (err) {
                res.status('400').send({
                    error: `Error finding inventory error - ${err}`
                });
            } else {
                res.status('200').send({
                    inventory: inventory
                }); //found inventory, return it.
            }
        });
    }



});




//get inventory by a specific category ID
router.get('/category/:categoryTag',(req,res,next)=>{
    Inventory.find({category:req.params.categoryTag},(err,inventory)=>{
        if(err){
            res.status('400').send(`Error finding by categoryTag - ${err}`);
        }else{
            res.status('200').send({inventory:inventory});
        }
    });
});

//return all inventory that is featured==true
router.get('/featured',(req,res,next)=>{
    Inventory.find({featured:true},(err,inventory)=>{
        if(err){
            res.status('400').send(`Error retrieving featured inventory. Error - ${err}`);
        }else{
            res.status('200').send({inventory:inventory});
        }
    });
});



//route to add new inventory items
router.post('/add',(req,res,next)=>{

    var inventory = new Inventory({
        name: req.body.name,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        imageURL: req.body.imageURL,
        quantity: req.body.quantity,
        created_at: Date(),
        updated_at: Date(),
        factoryDescription: req.body.factoryDescription,
        shopDescription: req.body.shopDescription,
        condition: req.body.condition,
        featured: req.body.featured
    });

    inventory.save((err)=>{
        if(err){
            res.status('400').send(`Error adding inventory item ${inventory}.\n Error - ${err}`);
        }else{
            res.status('200').send(`Added inventory item ${inventory}`);
        }
    });

});

router.delete('/:id/delete',(req,res,next)=>{
    Inventory.findByIdAndDelete({_id:req.params.id.trim()},(err,doc)=>{
        if(err){
            res.status(400).send(`Failed to delete, error - ${err}`);
        }else{
            res.status(200).send({doc:doc});
        }
    })
});



module.exports = router;