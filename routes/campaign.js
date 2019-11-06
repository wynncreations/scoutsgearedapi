const express = require('express');
router = express.Router();
const Campaign = require('../models/campaign');
const CampaignEvent = require('../models/campaign_event');
const Kid = require('../models/kids');

//Get all campaign by unit id
router.get('/unit/:id', (req, res, next) => {
    Campaign.find({unit_ID:req.params.id},(err, campaign) => {
        if (err) {
            res.status(400).send(`Error - ${err}`);
        } else {
            res.status(200).send({
                campaigns: campaign
            });
        }
    })
});

router.post('/add', (req, res, next) => {
    var campaign = new Campaign({
        label: req.body.label,
        unit_ID: req.body.unit_id
    });

    console.log(JSON.stringify(campaign));

    campaign.save((err) => {
        if (err) {
            res.status(400).send(`error saving category - ${err}`);
        } else {
            res.status(200).send(`Successfully saved category - ${JSON.stringify(campaign)}`)
        }
    });
});

//Get campaign by ID
router.get('/:id', (req, res, next) => {
    Campaign.findOne({
        _id: req.params.id
    }, (err, campaign) => {
        if (err) {
            res.status(400).send(`Error - ${err}`);
        } else {
            res.status(200).send({
                campaign: campaign
            });
        }
    })
});


router.post('/:id/updatescout',(req,res,next)=>{
    CampaignEvent.findOneAndUpdate(
        {    
            scout_id:req.body.scout_id,
            campaign_id:req.body.campaign_id
        },
        {
            $inc:{total_raised:parseFloat(req.body.update_amount)}
        },
        {
            new:true,
            upsert:true
        },(err,doc)=>{
            if(err){
                res.status(500).send({
                    status:`Error`,
                    message:`Error updating ${err}`
                });
            }else{
                //we also now need to update the master record for the scout.
                Kid.findOneAndUpdate({
                    _id: req.params.scout_id
                }, {
                    $inc: {
                        fundRaised:parseFloat(req.body.update_amount)
                    }
                },(err,doc)=>{
                    if(err){
                        res.status(500).send({
                            status:`Error`,
                            message:`Error updating ${err}`
                        });
                    }else{
                        res.status(201).send({
                        status:`Ok`,
                        message:doc
                        });
                    }
                });
            }
        });
});

//pass in a campaign id and scout id and get the event doc
router.get('/getEvent/:campaign_id/scout/:scout_id',(req,res,next)=>{
    CampaignEvent.findOne({campaign_id:req.params.campaign_id,scout_id:req.params.scout_id},(err,doc)=>{
        if(err){
            res.status(501).send({
                status:`Error`,
                message:`Error Finding ${err}`
            });
        }else{
            res.status(200).send({
                status:`Ok`,
                message:doc
            });
        }
    });
});

/*
Todo: Add support to update the scouts Funds Raised amount on their primary doc whenever we make a change to a single campaign.
*/

module.exports = router;