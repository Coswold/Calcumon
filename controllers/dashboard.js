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
            return res.status(401); // UNAUTHORIZED
        }
    });

    /*
    // UPDATE USER STATS
    app.put('/save', (req, res) => {
        if (req.user) {
            User.findByIdAndUpdate(req.user._id, { $inc: {coins: 10}, {level: 1} } ).then(user => {
                res.redirect(`/dashboard/${req.user._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    })
    */

    // Need route to edit profile

}
