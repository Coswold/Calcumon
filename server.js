const express = require('express')
const app = express();
require('dotenv').load();
process.env.SECRET
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars')

app.use(cookieParser());
app.use(methodOverride('_method'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};

app.use(checkAuth);

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./data/calcumon-db');
require('./controllers/auth.js')(app);
require('./controllers/choose.js')(app);
require('./controllers/dashboard.js')(app);
require('./controllers/game.js')(app);
require('./controllers/mobile_api.js')(app);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
