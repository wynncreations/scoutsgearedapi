var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    name: {type:String, unique:false, required:true},
    category: String,
    subCategory: String,
    price: Number,
    imageURL: String,
    quantity: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date,
    factoryDescription: String,
    shopDescription: String,
    condition: String,
    featured: Boolean,
    unit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    }
});

// Compile model from schema
var InventoryModel = mongoose.model('Inventory', InventorySchema);

module.exports = InventoryModel;