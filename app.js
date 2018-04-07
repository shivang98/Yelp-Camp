var express = require('express'),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require('mongoose'),
Campground  = require('./models/campgrounds'),
Comment     = require('./models/comments'),
seedDb       = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
seedDb();

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, newCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/index', {campgrounds: newCampgrounds});
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
    });
});

app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// =========================
// Comments Routes
// =========================

app.get('/campgrounds/:id/comments/new', function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render('comments/new', {campground: foundCampground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect('/campgrounds');
                } else{
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + req.params.id);
                }
            });
        }
    });
});

app.listen(3000,function(){
    console.log("Server has started!") 
});