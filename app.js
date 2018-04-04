var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
    {name: "Rishikesh", image:"http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg"},
    {name: "Lancedown", image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Manali", image:"http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg"},
    {name: "Rishikesh", image:"http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg"},
    {name: "Lancedown", image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Manali", image:"http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg"},
    {name: "Rishikesh", image:"http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg"},
    {name: "Lancedown", image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
    {name: "Manali", image:"http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg"},
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.listen(3000,function(){
    console.log("Server has started!") 
});