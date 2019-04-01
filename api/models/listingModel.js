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


Listing.getListings = function getListings(listing, result) {
    address = "%" + listing.city + ", " + listing.state ;
    let value = [listing.min, listing.max, listing.bedroom, listing.bathroom, address];
    let query = "SELECT numRooms, numBath, parking, addr, price, listing_type, listing_desc, posted_date, first_name, last_name, email, username, image_path  FROM listings, users WHERE users.u_id = listings.listed_by AND price BETWEEN ? AND ? AND numRooms <= ? AND numBath <= ? AND addr LIKE ?";  //select * image
    console.log(query);
    console.log(value);
    sql.query(query, value, function (err, res) {
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

Listing.getListingsByLocationAndProperty = function getListingsByLocationAndProperty(location, property, result) {
    //let query = "SELECT * FROM listings WHERE listing_type = '" + property + "' AND addr LIKE '%" + location + "%'";  //select * image
    let query = "SELECT * FROM listings WHERE listing_type = ? AND addr LIKE ?";  //select * image
    sql.query(query, [property, "%" + location + "%"], function (err, res) {
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