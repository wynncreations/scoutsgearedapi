var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    account_type: String,
    isParent: Boolean,
    created_at: Date,
    updated_at: Date,
    unit_ID: {
        type: mongoose.Schema.Types.ObjectId, ref:'Unit'
    },
    position:{
        type: String,
    }

});

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema);

module.exports =  UserModel;