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

    app.route('/posting')
        .get((req, res) =>{
            res.render("posting");
        })
        .post(listings.createListing);

    app.route('/users/:userId')
        .get(users.getUserById)
        .put(users.updateUser);

    app.route('/')
        .get(listings.getIndexListing);
        // .get((req, res) =>{
        //     res.render("index", {state: ["MA", "NH"]});
        // })

    app.route('/login')
        .get((req, res) => {
            res.render("login");
        })
        .post(users.login);

    app.route('/register')
        .get((req, res) => {
            res.render("register");
        })
        .post(users.createUser);
    
    
};