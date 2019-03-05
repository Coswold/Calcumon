const User = require('../models/user')

module.exports = function(app) {
    // Need path to show DASHBOARD
    app.get(`/dashboard/:id`, (req, res) => {
        if (req.user) {
            var currentUser = req.user;
            res.render('dashboard', { currentUser });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // Need path to go to game play
    app.get(`/gameplay`, (req, res) => {
        if (req.user) {
            var currentUser = req.user;
            res.render('gamePlay', { currentUser });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // Need path to edit profile

}
