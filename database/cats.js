var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temprament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "George1",
//     age: 11,
//     temprament: "nice"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("WE JUST SAVED A CAT TO THE DB:")
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "sweety1",
//     age: 12,
//     temprament: "sweet"
// }, function (err, cat){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("WE JUST SAVED A CAT TO THE DB:")
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats){
    if(err){
        console.log(err);
    }else{
        console.log("All cats")
        console.log(cats);
    }
});