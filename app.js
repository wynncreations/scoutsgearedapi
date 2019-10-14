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
app.use(function (req, res, next) {
    var ip = req.ip.split(':')[1];
    var approvedIPs = process.env.WHITELIST.split(',')
    console.log(ip);
    if (!approvedIPs.includes(ip)) {
        res.send(`Unauthorized request.`);
    }else{
        next();
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


//plug the routes in.
app.use('/inventory', inventory);
app.use('/auth', auth);
app.use('/unit', unit);
app.use('/kid', kid);
app.use('/scout', scout);
app.use('/dens', dens);


//app.get('/',(req,res,next)=>{
  //  res.send(req.ip.split('::ffff:')[1]);
//});







// create the server
app.listen(port, () => {
    console.log(`Server online! Please proceed to port ${port} for rapid assimilation.`);
});