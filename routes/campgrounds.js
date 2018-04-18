var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middlewareObj = require("../middleware");

router.get('/', function(req, res){
    res.render('landing');
});

router.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, newCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/index', {campgrounds: newCampgrounds});
        }
    });
});

router.post('/campgrounds',middlewareObj.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var dec = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name,price: price, image:image, description:dec, author: author};
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds');        
        }
    });
});

router.get('/campgrounds/new',middlewareObj.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

router.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

router.get('/campgrounds/:id/edit',middlewareObj.isCampgroundAuth, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
            res.redirect('/campgrounds');
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

router.put('/campgrounds/:id',middlewareObj.isCampgroundAuth, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            console.log(updatedCampground);
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/campgrounds/:id',middlewareObj.isCampgroundAuth, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;