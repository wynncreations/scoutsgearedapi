var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    }

});

// Compile model from schema
var CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;