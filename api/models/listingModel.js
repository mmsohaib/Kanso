var sql = require('./db.js');

var Listing = function(listing){
    this.listed_by = listing.listed_by;
    this.addr = listing.addr;
    this.listing_type = listing.listing_type;
    this.numRooms = listing.numRooms;
    this.numBath = listing.numBath;
    this.parking = listing.parking;
    this.price = listing.price;
    this.listing_desc = listing.listing_desc
};

Listing.createListing = function createListing(newListing, result) {    
    sql.query("INSERT INTO listings set ?", newListing, function (err, res) { 
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Listing.getListingById = function createListing(listingId, result) {
    sql.query("SELECT * from listings where listing_id = ?", listingId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);  
        }
    });   
};

Listing.getAllListings = function getAllListings(result) {
    sql.query("SELECT * FROM listings", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });   
};

Listing.updateById = function(id, listing, result){
    sql.query("UPDATE listings SET listing = ? WHERE id = ?", [listing.listing, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{   
            result(null, res);
        }
    }); 
};

Listing.remove = function(id, result){
    sql.query("DELETE FROM listings WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports=Listing;