var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var KidsSchema = new Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: Number,
    created_at: Date,
    updated_at: Date,
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId, ref:"Unit"
    },
    subUnitID:{
        type: mongoose.Schema.Types.ObjectId, ref:"Den"
    },
    subUnitType:{
        type: String
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId, ref:"User", required: true
    },
    fundRaised:{
        type: Number
    },
    profit:{
        type: Number
    },
    scoutFund:{
        type: Number
    }

});

KidsSchema.index({"firstname":1,"lastname":1,"parent":1},{unique: true})

// Compile model from schema
var KidModel = mongoose.model('Kid', KidsSchema);

module.exports = KidModel;