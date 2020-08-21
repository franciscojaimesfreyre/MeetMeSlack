const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// test route
app.get('/', function(req, res) {
    res.status(200).send('Ready!');
});

app.listen(port, function() {
    console.log('MeetMeSlack listening on port ' + port);
});

app.post('/slash', require('./slash'));
