const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser);

app.get('/api/supervisors', (req,response) => {
    var data = [];
    request('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body)
        data = body;
        console.log(data)
        response.send({result:data})
    })
})

app.post('/api/submit', urlencodedParser, (req,res) => {
    var body = req.body
    console.log(body)

})

app.listen(API_PORT, () => console.log('Listening on port: '+ API_PORT));
