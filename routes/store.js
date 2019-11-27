const express = require("express");
const router = express.Router();
const StoreEvent = require("../models/store_event");
const Item = require('../models/item');
const Kid = require('../models/kids');
const User = require('../models/users');
const sgMail = require('@sendgrid/mail');

 sgMail.setApiKey(process.env.EMAIL_KEY);


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

    var scout = '';

    Kid.findOne({_id:req.body.scout_id},(err,kid)=>{
        if (err) {
            res.status('502').send(err)
        }

        scout = kid
    });
    

    
    //var admins;
    Item.findOne({_id:req.body.item_id},(err,doc)=>{
        if(err){res.status('502').send(err)}
        
        const msg = {
            to: req.body.username,
            //cc: 'robert+scoutsgearedadmin@wynnoutfitters.com', //Admin account
            from: 'admin@scoutsgeared.com',
            templateId: 'd-cf4858298dbd4229992a61aa32e682c2',
                dynamic_template_data: {
                    subject: `Thank you for your purchase!`,
                    itemname: req.body.doc.name
                },
        };
        const status = sgMail.send(msg);
        
            console.log((parseFloat(req.body.retail_cost) * -1))
            //update scout fund total
            Kid.findOneAndUpdate({
                _id: req.body.scout_id
            }, {
                $inc: {
                    scoutFund: (parseFloat(req.body.retail_cost) * parseFloat(-1))
                }
            }, (err, doc) => {
                res.status(200).send({
                    message: `Successfully logged event`
                });
            });
    
    });

});



module.exports = router;