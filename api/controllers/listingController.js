var Listing = require('../models/listingModel.js');

exports.getAllListings = function(req, res) {
    Listing.getAllListings(function(err, listing) {
        if(err) {
            res.send(err);
        }

        console.log('res', listing);
        res.send("getlistall");
        // res.render("index");
    });
};

exports.getListings = function(req, res) {
    Listing.getListings(req.body, function(err, listing) {
        if(err) {
            res.send(err);
        }

        console.log('res', listing);
        // res.send("getListing");
        res.render("display", {"properties" : listing, "state": ["MA", "NH"]});
    });
};


exports.getListingsByLocationAndProperty = function(req, res) {
    let location = req.query.location;
    let property = req.query.property;
    
    console.log(location);

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
        console.log("before " + listing);
        listing[0] = Object.assign(listing[0], {"posted_time" : getPostedTime(listing[0].posted_date)});
        console.log(listing);
        res.render("view", {listing: listing});
    });
};


function getPostedTime(postedDate){ //calculate the elapsed time from the posted date to now 
     pd = new Date(postedDate)
     timeDiff = Math.abs(new Date().getTime() - pd.getTime()) 
     diffDays = Math.ceil(timeDiff / (1000 * 3600 *24)) 
     return diffDays;
}

exports.getIndexListing = function(req, res) {
    Listing.getIndexListing(req.params.listingId, function(err, listing) {
        if(err) {
            res.send(err);
        }
        // console.log("before " + listing);
        listing[0] = Object.assign(listing[0], {"posted_time" : getPostedTime(listing[0].posted_date)});
        // console.log(listing);
        console.log("are youhere");
        res.render("index", {listing: listing, "state" : ["MA", "NH"]});
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

