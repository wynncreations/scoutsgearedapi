const express = require("express");
const router = express.Router();
const StoreEvent = require("../models/store_event");
const Item = require('../models/item');
const User = require('../models/users');
const sgMail = require('@sendgrid/mail');
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/purchase',(req,res,next)=>{
    //we need to log the store event
    var store_event = new StoreEvent({
        scout_id:req.body.scout_id,
        item_id:req.body.item_id,
        retail_cost:req.body.retail_cost,
        parent_email:req.body.parent_email
    });

    store_event.save(err=>{
        if(err){
            res.status(501).send(`Error saving event - ${err}`);
        }
    });
    
    //Lets get some data
    var item;
    //var admins;

    Item.findById({_id:req.body.item_id},(err,doc)=>{
        item = doc.json();
    });

    /*User.find({account_type:"Admin"},(err,doc)=>{
        admins = doc.json();
    });*/

    //console.log(item);
        
    const msg = {
        to: req.body.parent_email,
        cc: 'robert+scoutsgearedadmin@gmail.com', //Admin account
        from: 'robert@wynnoutfitters.com',
        subject: `Purchase of ${item.name} Confirmation`,
        text: `Congratulations, you have reserved  ${item.name} for the cost of $${req.body.retail_cost}. A follow up email will be sent once the item is available for pickup at your next meeting.`,
        html: `<strong>Congratulations, you have reserved  ${item.name} for the cost of $${req.body.retail_cost}. A follow up email will be sent once the item is available for pickup at your next meeting.</strong>`
    };
    sgMail.send(msg);


/*
    //update scout fund total
    User.findByIdAndUpdate({_id:req.body.scout_id},{$inc:{total_raised:(parseFloat(req.body.retail_cost)*-1)}},(err,doc)=>{
        res.status(200).send({message:`Successfully logged event ${req.body}`});
    });
    */

    res.status(200).send({
        message: `Successfully logged event`
    });
});



module.exports = router;