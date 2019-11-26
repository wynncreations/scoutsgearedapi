var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var StoreEventSchema = new Schema({
    scout_id: {
        type: mongoose.Schema.Types.ObjectId, ref:"Kid",
        required:true
    },
    item_id:{
        type: mongoose.Schema.Types.ObjectId, ref: "Item",
        require:true
    },
    retail_cost:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        Required:true,
        default:"New"
    },
    parent_email:{
        type:String
    }

});

// Compile model from schema
var StoreEventModel = mongoose.model('StoreEvent', StoreEventSchema);

module.exports = StoreEventModel;