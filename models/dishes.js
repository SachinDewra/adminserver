const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const dishSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: false,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
},{
    timestamps:true
});


var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;