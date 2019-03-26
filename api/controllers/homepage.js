// var Listing = require('../models/listingModel.js');


exports.homegage = function(req, res) {
    
    Listing.getAllListings(function(err, listing) {
        if(err) {
            res.send(err);
        }
        console.log('res', listing);
        res.send("good");
        // res.render("index");
    });
};