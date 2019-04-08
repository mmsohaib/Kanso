var Listing = require('../models/listingModel.js');
var geocode = require('../../public/script/map.js');

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
    let address = req.body.street + " " + req.body.city + ", " + req.body.state;
    let listing = {
                listed_by : req.body.listed_by, 
                addr : address, 
                listing_type : req.body.type,
                numRooms : req.body.room,
                numBath : req.body.bath,
                parking : req.body.parking,
                price : req.body.price,
                listing_desc : req.body.description,
                image_path: req.body.image,
                lat : req.body.lat,
                lng : req.body.lng
            }

            
    var newListing = new Listing(listing);
    console.log(newListing);
    console.log(req.body);

    // if(!newListing.listed_by){
    //     res.status(400).send({ error:true, message: 'Please provide listing' });
    // }
    // else{
    //     Listing.createListing(newListing, function(err, listing) {
    //         if(err) {
    //             res.send(err);
    //         }
    //         res.json(listing);
    //     });
    // }
};


function initMap(address) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();
  
    // document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, address, map);
    // });
  }
  
  function geocodeAddress(geocoder, address, resultsMap) {
    // var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        console.log("this is gecoding");
        console.log(results);
  
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }






function getLatLng(address){
    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode( { 'address': address}, function(results, status) {

        
    //         var lat = results[0].geometry.location.latitude;
    //         var lng = results[0].geometry.location.longitude;
    //         console.log("lat is " + lat + " lng is " + lng);
    // })        
}

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
        listing.map(value => {
            value = Object.assign(value, {"posted_time" : getPostedTime(value.posted_date)});
        });
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

