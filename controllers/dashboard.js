const User = require('../models/user')

module.exports = function(app) {
    // Need path to show DASHBOARD
    app.get(`/dashboard/:id`, (req, res) => {
        if (req.user) {
            let id = req.user._id.toString()
            User.findById(id).then( currentUser => {
                console.log(currentUser)
                res.render('dashboard', { currentUser });
            }).catch((err) => {
                console.log(err.message)
            })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // Need path to go to game play
    app.get(`/gameplay`, (req, res) => {
        if (req.user) {
            let id = req.user._id.toString()
            User.findById(id).then( currentUser => {
                console.log(currentUser)
                res.render('gamePlay', { currentUser });
            }).catch((err) => {
                console.log(err.message)
            });
        } else {
            const currentUser = new User;
            currentUser.username = 'guest'
            currentUser.password = '1234'
            currentUser.monster = 'monster1'
            console.log(currentUser)
            res.render('gamePlay', { currentUser });
        }
    });

    // Need route to edit profile

}
