let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();


let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const uri = 'mongodb+srv://Admin:trudne_haslo.123@cluster0.edli7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Prints "MongoError: bad auth Authentication failed."
//mongoose.connect(uri, {
//  useNewUrlParser: true,
//}).catch(err => console.log(err.reason));

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Obsługa przepisów kuchennych Rafał Chmielewski'));

// Use Api routes in the App
app.use('/', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running REST_RECIPES on port " + port);
});