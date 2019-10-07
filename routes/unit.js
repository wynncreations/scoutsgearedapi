const express = require('express');
router = express.Router();
const Unit = require('../models/unit');

router.post('/create',(req,res,next)=>{

    console.log(req.body.unit_number)

    var unit = new Unit({
        unit_name: req.body.unit_name,
        unit_type: req.body.unit_type,
        unit_number: req.body.unit_number,
        council: req.body.council,
        district: req.body.district,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        updated_at: Date.now(),
        fundRaisingGoal: req.body.fundRaisingGoal
    });

    Unit.find({
        unit_type: req.body.unit_type, unit_number: req.body.unit_number
    },(err, foundUnit)=>{
        if(err){
            res.status(400).send(`Error matching unit - ${err}`); 
        }else{
            if (foundUnit.unit_number === req.body.unit_number && foundUnit.unit_type === req.body.unit_type){//if the unit has already been registered
                res.status(401).send(`Unit already registered, please contact your Unit admin`);
            }else{//unit not registered.
                unit.save((err, unit) => {
                    if (err) {
                        res.status(400).send(`Error registering unit - ${err}`);
                    } else {
                        //console.log(`Successfully registered unit - ${unit}`)
                        res.status(200).send({
                            unit: unit
                        });
                    }
                });
            }
        }
    });
});

router.get('/:id',(req,res,next)=>{
    Unit.findOne({_id:req.params.id},(err,unit)=>{
        if(err){
            res.status(400).send(`Error finding unit - ${err}`);
        }else{
           // console.log(unit)
            res.status(201).send({unit:unit});
        }
    })
});

router.get('/', (req,res,next)=>{
    Unit.find({},(err,units)=>{
        if(err){
            res.status(400).send(`Error finding units - ${err}`);
        }else{
            res.status(200).send({units:units});
        }
    })
});




module.exports = router;