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
    image: String,
    comment: {
        type: Array,
        of: String,
        default: ['0', '2']     
    }     //remember to update comments list
})

module.exports = mongoose.model('Post', postSchema);