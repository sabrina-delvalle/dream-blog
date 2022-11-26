const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('connected to MongoDB.'));

const postSchema = mongoose.Schema({
    title: String,
    autor: String,
    quote: String,
    date: {
        type: Date,
        default: Date.now
    },
    article: Object,
    images: {
        type: Array,
        of: String,
        default: []
    },
    comments: {
        type: Array,
        of: Object,
        default: []     
    }     //remember to update comments list
})

module.exports = mongoose.model('Post', postSchema);