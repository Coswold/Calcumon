const User = require('../models/user')
const Calcumon = require('../models/calcumon')

module.exports = (app) => {

    app.get('/choose', (req, res) => {
        let username = "test"
        if (req.user) {
            username = req.user.username
        }
        res.render('chooseCalcumon', { username: username});
    });

    // CREATE
    app.post('/choose/calcumon', (req, res) => {
        console.log(req.body)
        // INSTANTIATE INSTANCE OF CALCUMON MODEL
        if (req.body.user) {
            req.user = req.body.user
        }
        if (req.user) {
            const calcumon = new Calcumon({ name: req.body.calcumon });
         // SAVE INSTANCE OF CALCUMON MODEL TO DB
         calcumon.save().then(calcumon => {
             return User.findOne({username: req.body.user});
         })
         .then(user => {
             user.monster = calcumon.name;
             console.log(user.monster)
             user.save();
             // REDIRECT TO THE DASHBOARD
             res.status(200).send(`/dashboard/${user._id}`)
         })
         .catch(err => {
             console.log(err.message);
         })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
}
