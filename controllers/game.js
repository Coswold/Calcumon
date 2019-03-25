const User = require('../models/user')

module.exports = function(app) {

    // Need path to go to game play
    app.get(`/gameOverLose`, (req, res) => {
        if (req.user) {
            res.render(`gameOverLose`)
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // Need path to go to game play
    app.get(`/gameOverWin`, (req, res) => {
        if (req.user) {
            res.render(`gameOverWin`)
        } else {
            return res.status(401); // UNAUTHORIZED
        }
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
