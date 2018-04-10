var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj = require("../middleware");


router.get('/campgrounds/:id/comments/new',middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render('comments/new', {campground: foundCampground});
        }
    });
});

router.post('/campgrounds/:id/comments',middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect('/campgrounds');
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + req.params.id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.isCommentAuth, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render('comments/edit', {comment: foundComment, campground_id: req.params.id});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id",middlewareObj.isCommentAuth, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.isCommentAuth, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;