var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://i.pinimg.com/originals/ab/5e/c4/ab5ec4ff722b1f65b855af71ba78c6fc.jpg",
        description: "Lorem ipsum dolor sit amet, lorem clita explicari vix te. Per dolorem corpora dissentias no. Et eos tamquam consulatu iracundia, mucius graeco denique eam no, vix eu labitur accumsan. Erant primis elaboraret sit ne."
    },
    {
        name: "Desert Mesa",
        image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description: "Lorem ipsum dolor sit amet, lorem clita explicari vix te. Per dolorem corpora dissentias no. Et eos tamquam consulatu iracundia, mucius graeco denique eam no, vix eu labitur accumsan. Erant primis elaboraret sit ne."
    },
    {
        name: "Canyon's Floor",
        image: "http://www.poconosbest.com/images/campground.jpg",
        description: "Lorem ipsum dolor sit amet, lorem clita explicari vix te. Per dolorem corpora dissentias no. Et eos tamquam consulatu iracundia, mucius graeco denique eam no, vix eu labitur accumsan. Erant primis elaboraret sit ne."
    },
];

function seedDb(){
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } else{
        //     console.log("Removed campgrounds!");
        // }
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else{
        //             console.log("Added new campground");
        //             Comment.create({
        //                 text: "This palce is greate i wish there was Internet",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 } else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created a new comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}

module.exports = seedDb;