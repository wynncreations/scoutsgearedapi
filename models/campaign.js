var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    unit_ID:{
        type: mongoose.Schema.Types.ObjectId, ref: "Unit"
    },
    total_raised:
    {
        type:Number,
        require:true,
        unique:true
    },
    profit_margin:{
        type:Number,
        require:true,
        unique:true
    },
    profit:{
        type:Number,
        required:true,
        unique:true
    }

});

// Compile model from schema
var CampaignModel = mongoose.model('Campaign', CampaignSchema);

module.exports = CampaignModel;