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
    }

});

// Compile model from schema
var CampaignModel = mongoose.model('Campaign', CampaignSchema);

module.exports = CampaignModel;