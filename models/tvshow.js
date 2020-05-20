let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let tvshowSchema = new Schema(
    {
        title: String,
        year: Number,
        country: String,
        poster: String,
        seasons: Number,
        genre: String,
        summary: String
    }
);

module.exports = mongoose.model('TVShow', tvshowSchema);