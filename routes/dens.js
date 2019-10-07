const express = require('express');
router = express.Router();
const Den = require('../models/dens');

router.get('/', (req, res, next) => {
    //Default get all dens route
    Den.find((err,dens)=>{
        if(err){
            res.status(400).send(`Error - ${err}`);
        }else{
            res.status(200).send({dens:dens});
        }
    })

});


router.post('/add',(req,res,next)=>{

    var den = new Den({
        label: req.body.label
    });

    den.save((err)=>{
        if(err){
            res.status(400).send(`Error - ${err}`);
        }{
            res.status(200).send(`Added Den ${den}`);
        }
    });
});

module.exports = router;