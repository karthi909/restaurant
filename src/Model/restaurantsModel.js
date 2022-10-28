const mongoose = require('mongoose')

const restoSchema = new mongoose.Schema({
    resto_name:{
        type: String,
        requried: true
    },
    resto_discription:{
        type: String,
        requried: true
    },
    location:{
        type:{type: String, required: true},
        coordinates:[]
    },
    avg_ratings:{
        type: Number,
        default:0
    },
    ratings:{
        type: Number,
        default:0
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

restoSchema.index({location:"2dsphere"});

module.exports = mongoose.model('restaurants', restoSchema)