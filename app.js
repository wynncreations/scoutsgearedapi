const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require("connect-history-api-fallback");
const app = express();
app.use(cors());
app.use(bodyParser.json({
    type: "application/json"
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


dotenv.config();

// some logger stuff
//app.use(logger("dev"));

// db

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-o2tyb.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);


//We are going to add IP filtering of all requests as a middleware.
//I only want access to the api for MY frontend right now.
app.use(function (req, res, next) {
    var ips = req.ip.split(':');
    var approvedIPs = process.env.WHITELIST.split(',')
    console.log(ips);
    try{
        ips.forEach(ip => {
        if (approvedIPs.includes(ip)) {
            next();
        }
    });
    }catch{
        res.status(403).send('Unauthorized request');
    }
});

const port = process.env.PORT || 8001;

//routes go here
const inventory = require("./routes/inventory");
const auth = require('./routes/auth');
const unit = require('./routes/unit');
const kid = require('./routes/kid');
const dens = require('./routes/dens');
const scout = require('./routes/scout');
const item = require('./routes/item');
const category = require('./routes/category');
const campaign = require('./routes/campaign');

//plug the routes in.
app.use('/inventory', inventory);
app.use('/auth', auth);
app.use('/unit', unit);
app.use('/kid', kid);
app.use('/scout', scout);
app.use('/dens', dens);
app.use('/item',item);
app.use('/category',category);
app.use('/campaign', campaign);


// create the server
app.listen(port, () => {
    console.log(`Server online! Please proceed to port ${port} for rapid assimilation.`);
});