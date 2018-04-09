var express = require('express'),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require('mongoose'),
Campground  = require('./models/campgrounds'),
Comment     = require('./models/comments'),
User        = require('./models/users'),
passport    = require('passport'),
LocalStrategy = require('passport-local'),
seedDb      = require("./seeds");

var commentsRoutes = require("./routes/comments"),
campgroundsRoutes = require("./routes/campgrounds");
indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

// seedDb();

app.use(require("express-session")({
    secret: "Again I am the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentsRoutes);

app.listen(3000,function(){
    console.log("Server has started!") 
});