let express         = require('express'),
    app             = express(),
    http            = require('http'),
    server          = http.createServer(app),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    mongoose        = require('mongoose');

//require controller TVShowController
let TVShowController = require('./controllers/tvshows');

//Rutas de la API
let tvshows = express.Router();


tvshows.route('/tvshows')
    .get(TVShowController.findAllTVShows)
    .post(TVShowController.addTVShow);

tvshows.route('/tvshows/:id')
    .get(TVShowController.findTVShowById)
    .put(TVShowController.updateTVShow)
    .delete(TVShowController.deleteTVShow)
//-----------------------------------------------

//connect mongodb--------------------------------
mongoose.connect('mongodb://localhost/tvshows', function(err, res){
    if(err){
        console.log("ERROR: connectig to DB" + err);
    }else{
        console.log("Connected to DB");
    }
});
require('./models/tvshow');
//-----------------------------------------------

const port = 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(tvshows);

tvshows.get('/', (req, res) => {
    res.send("Hello world")
});

tvshows.get('/tvshows', (req, res) => {
    console.log("tvshows::::::", tvshows)
    res.json(tvshows)
});

//-----------------------------------------------

//start server
server.listen(port, () =>  console.log("listen on port " + port));