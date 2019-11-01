var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
    retail_cost:{
        type: Number,
        required: true
    },
    active_discount:{
        type: Boolean
    },
    active_discount_value:{
        type: Number
    },
    factory_url:{
        type: String
    },
    image_url:{
        type: String
    },
    description:{
        type: String
    },
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    }

});

// Compile model from schema
var ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;