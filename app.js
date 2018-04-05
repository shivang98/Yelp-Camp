var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Starting data
// Campground.create({
//     name: "Lancedown", 
//     image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
//     description: "Nice and beautiful quite place"
// }, function(err, campgrounds){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Added new campground");
//         console.log(campgrounds);
//     }
// });


app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, newCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('index', {campgrounds: newCampgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var dec = req.body.description;
    var newCampground = {name: name, image:image, description:dec};
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds');        
        }
    })
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render('show', {campground: foundCampground});
        }
    })
});

app.listen(3000,function(){
    console.log("Server has started!") 
});