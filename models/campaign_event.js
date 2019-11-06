var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var CampaignEventSchema = new Schema({
    scout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kid"
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    },
    total_raised:Number


});

// Compile model from schema
var CampaignEventModel = mongoose.model('CampaignEvent', CampaignEventSchema);

module.exports = CampaignEventModel;