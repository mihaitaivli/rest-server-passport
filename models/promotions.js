var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create schema
// In practice the name can't be unique
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price:{
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create a model using the schema
var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;