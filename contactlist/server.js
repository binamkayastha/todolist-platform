var express = require('express');
var app = express();

//app.get('/', function(req, res) {
//    res.send("Hello World!")
//});
app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function (req, res) {
    console.log('recevied GET request for contact list');

    person1 = {
        name: 'yo',
        email: 'test'
    };

    person2 = {
        name: 'cookie',
        email: 'cookieemail'
    }

    var contactlist = [person1, person2];
    res.json(contactlist);
});


app.listen(3000);
console.log("Server running on por 3000");
