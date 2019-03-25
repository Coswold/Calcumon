const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    // // SIGN UP FORM
    // app.get("/signup", (req, res) => {
    //     res.render("signup");
    // });

    // SIGN-UP GET
    app.get('/signup', (req, res) => {
        const currentUser = req.user;
        res.render('signup', { currentUser });
    });

    // SIGN UP POST
    app.post("/sign-up", (req, res) => {
        // Create User and JWT
        const user = new User(req.body);
        console.log(user)
        user.save()
        .then((user) => {
            var token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect("/choose");
        })
        .catch(err => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    })

    // Login FORM
    app.get('/', (req, res) => {
        res.render('login');
    });

    // LOGIN
    app.post("/login", (req, res) => {
        console.log(req.body)
        const username = req.body.username;
        const password = req.body.password;
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
                res.redirect(`/dashboard/${user._id}`);
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
}
