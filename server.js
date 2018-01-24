// consts
var PORT = 8000;

// Require vars and modules
var path         = require('path'),
    http         = require('http'),
    https        = require('https'),
    express      = require('express'),
    fs           = require('fs'),
    bodyParser   = require('body-parser'),
    cors         = require('cors'),
    request      = require('request'),
    gzip         = require('express-static-gzip');


// Init Express
var app = express();

// Enable cors
app.use("/", gzip("/public", {
    enableBrotli: true,
    customCompressions: [{
        encodingName: "deflate",
        fileExtension: "zz"
    }]
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Basic route
app.get('/', function(req, res) {
    res.sendFile('/public/index.html');
});

// Ensure the app routes don't break when the page is
// refreshed
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Init server
var server = app.listen(process.env.PORT || 8000, function() {
    var host = server.address().address;

    console.log('App listening at: https://localhost:' + PORT);
});

