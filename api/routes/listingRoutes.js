module.exports = function(app) {
    var listings = require('../controllers/listingController');
    var users = require('../controllers/userController');

    
    app.route('/listings/:location/:property')
        .get(listings.getListingsByLocationAndProperty);
        // .get((req, res) =>{
        //     res.send("index test");
        // })
    
    app.route('/listings')
        .post(listings.getListings);
        
    
    

    app.route('/listings/:listingId')
        .get(listings.readListing)
        .put(listings.updateListing)
        .delete(listings.deleteListing);
    
    app.route('/users/')
        .post(users.createUser);

    app.route('/users/:userId')
        .get(users.getUserById)
        .put(users.updateUser);

    app.route('/')
        .get((req, res) =>{
            res.render("index", {state: ["MA", "NH"]});
        })
    
};