var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var DenSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    }
    
});

// Compile model from schema
var DenModel = mongoose.model('Den', DenSchema);

module.exports = DenModel;