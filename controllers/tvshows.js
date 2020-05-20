let TVShow = require('../models/tvshow');

//GET - retorna todos los tvshows en la db
exports.findAllTVShows = (req, res) => {
    TVShow.find(function(err, tvshows){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(tvshows);
    });
};

//GET - return a TVShow with specific ID
exports.findTVShowById = (req, res) => {
    TVShow.findById(req.params.id, function(err, tvshow){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(tvshow);
    })
}

//POST - inseta un nuevo tvshow en la db
exports.addTVShow = (req, res) => {
    let tvshow = new TVShow({
        title: req.body.title,
        year: req.body.year,
        country: req.body.country,
        poster: req.body.poster,
        seasons: req.body.seasons,
        genre: req.body.genre,
        summary: req.body.summary
    })

    tvshow.save(function(err, tvshow){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(tvshow);
    });
};

//PUT - Update a document which already exists
exports.updateTVShow = (req, res)=> {
    TVShow.findById(req.params.id, function(err, tvshow){
        tvshow.title = req.body.title;
        tvshow.year = req.body.year;
        tvshow.country = req.body.country;
        tvshow.poster = req.body.poster;
        tvshow.seasons = req.body.seasons;
        tvshow.genre = req.body.genre;
        tvshow.summary = req.body.summary;

        tvshow.save(function(err){
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(tvshow);
        });
    });
}

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = (req, res) => {
    TVShow.findById(req.params.id, function(err, tvshow){
        tvshow.remove(function(err){
            if(err) return res.send(500, err.message);
            res.status(200);
        })
    })
}
