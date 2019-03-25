const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    // SIGN UP POST
    app.post("/mobile/sign-up/", (req, res) => {
        // Create User and JWT
        const user = new User();
        user.username = req.params.username
        user.password = req.params.password
        console.log(user)
        user.save()
        .then((user) => {
            var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.json(user);
        })
        .catch(err => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.status(200).send({ message: "success"});
    })

    // LOGIN
    app.post("/mobile/login/", (req, res) => {
        console.log(req.params)
        const username = req.params.username;
        const password = req.params.password;
        // Find this user name
        User.findOne({ username }, "username password")
        .then(user => {
            if (!user) {
                // User not found
                return res.status(401).send({ message: "Wrong Username or Password" });
            }
            // Check the password
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    // Password does not match
                    return res.status(401).send({ message: "Wrong Username or password" });
                }
                // Create a token
                const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                    expiresIn: "60 days"
                });
                // Set a cookie and redirect to root
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                res.json(user);
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
}
