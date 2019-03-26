var Listing = require('../models/listingModel.js');

exports.getAllListings = function(req, res) {
    Listing.getAllListings(function(err, listing) {
        if(err) {
            res.send(err);
        }

        console.log('res', listing);
        res.send("gooda");
        // res.render("index");
    });
};


exports.getListingsByLocationAndProperty = function(req, res) {
    let location = req.query.location;
    let property = req.query.property;
    
    

    Listing.getListingsByLocationAndProperty(location, property, function(err, listing) {
        if(err) {
            res.send(err);
        }

        console.log('res', listing);
        res.send(listing);
        // res.render("index");
    });
};


exports.createListing = function(req, res) {
    var newListing = new Listing(req.body);
    if(!newListing.listed_by){
        res.status(400).send({ error:true, message: 'Please provide listing' });
    }
    else{
        Listing.createListing(newListing, function(err, listing) {
            if(err) {
                res.send(err);
            }
            res.json(listing);
        });
    }
};

exports.readListing = function(req, res) {
    Listing.getListingById(req.params.listingId, function(err, listing) {
        if(err) {
            res.send(err);
        }
        res.json(listing);
    });
};

exports.updateListing = function(req, res) {
    Listing.updateById(req.params.userId, new Listing(req.body), function(err, listing) {
        if(err) {
            res.send(err);
        }
        res.json(listing);
    });
};

exports.deleteListing = function(req, res) {
    Listing.remove( req.params.userId, function(err, listing) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'Listing successfully deleted' });
    });
};