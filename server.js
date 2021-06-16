const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
var JSONStream = require("JSONStream");
var es = require('event-stream')
const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//const jsonStream = JSONStream.parse(["bmiValues", true]);

dotenv.config();
const port = process.env.PORT;

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.post('/calculateBMI', (req, res) => {
    req.on('data', function(chunk) {
            console.log("Data received")
        })
        /*var stream = req.pipe(JSONStream.parse("bmiValues.*")).pipe(
            es.through(function(data) {
                console.log("printing one customer object read from file ::");
                console.log(data);
                this.pause();
                processOneCustomer(data, this);
                return data;
            }),
            function end() {
                console.log("stream reading ended");
                this.emit("end");
            });*/
})

function processOneCustomer(data, es) {
    es.resume();
}

app.listen(port, function() {
    console.log('Node Server Started...')
})