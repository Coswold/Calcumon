const User = require('../models/user')

module.exports = function(app) {

    // Need path to go to game play
    app.get(`/gameOverLose`, (req, res) => {
        if (req.user) {
            let id = req.user._id.toString()
            User.findById(id).then( currentUser => {
                res.render(`gameOverLose`, { currentUser });
            })
        } else {
            res.redirect(`/`)
        }
    });

    // Need path to go to game play
    app.get(`/gameOverWin`, (req, res) => {
        if (req.user) {
            let id = req.user._id.toString()
            User.findById(id).then( currentUser => {
                res.render(`gameOverWin`, { currentUser });
            })
        } else {
            res.redirect(`/`)        }
    });

    // UPDATE USER STATS
    app.get('/save', (req, res) => {
        if (req.user) {
            User.findByIdAndUpdate(req.user._id, { $inc: {coins: 10}, $inc: {level: 1} } ).then(user => {
                console.log(req.user.coins)
                res.redirect(`/dashboard/${req.user._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    })
}
