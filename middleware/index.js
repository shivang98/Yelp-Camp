middlewareObj = {}
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

middlewareObj.isCampgroundAuth = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                } else{
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login first to do that");
        res.redirect("back");
    }
}

middlewareObj.isCommentAuth = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else{
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login first to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "Please login first to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;