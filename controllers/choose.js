const User = require('../models/user')
const Calcumon = require('../models/calcumon')

module.exports = (app) => {

    app.get('/choose', (req, res) => {
        res.render('chooseCalcumon');
    });

    // CREATE
    app.post('/choose/calcumon', (req, res) => {
        // INSTANTIATE INSTANCE OF CALCUMON MODEL
        if (req.user) {
            const calcumon = new Calcumon(req.body);
         // SAVE INSTANCE OF CALCUMON MODEL TO DB
         calcumon.save().then(calcumon => {
             return User.findById(req.user._id);
         })
         .then(user => {
             user.monster = calcumon;
             user.save();
             // REDIRECT TO THE DASHBOARD
             res.redirect(`/dashboard/${user._id}`)
         })
         .catch(err => {
             console.log(err.message);
         })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
}
