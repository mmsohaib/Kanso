module.exports = function(app) {
    var listings = require('../controllers/listingController');
    var users = require('../controllers/userController');

    app.route('/listings')
        .get(listings.getAllListings)
        .post(listings.createListing);
   
    app.route('/listings/:listingId')
        .get(listings.readListing)
        .put(listings.updateListing)
        .delete(listings.deleteListing);
    
    app.route('/users/')
        .post(users.createUser);

    app.route('/users/:userId')
        .get(users.getUserById)
        .put(users.updateUser);
};