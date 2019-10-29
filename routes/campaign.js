const express = require('express');
router = express.Router();
const Campaign = require('../models/campaign');

//Get all campaign
router.get('/:id', (req, res, next) => {
    Campaign.find({unit_id:req.params.id},(err, campaign) => {
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
        unit_id: req.body.unit_id
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


module.exports = router;