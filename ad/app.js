var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var SerialPort = require("serialport");
var socketIO = require("socket.io");

var dist=0;
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM7', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});

var io = socketIO(app);

io.on('connection', function (socket) {
    parser.on('data', function (data) {
        // Assuming data is the distance in centimeters received from the Arduino
        // Parse the numeric value of distance from the data
        const distance = parseInt(data);
        
        // Check if the parsed distance is a valid number
        if (!isNaN(distance)) {
            // Emit the distance to the client
            // socket.emit('distance', { distance: distance });
            console.log(distance);
        } else {
            socket.emit('distance', { distance: data });
            console.error('data received:', data);
            dist=data;
        }
    });
});


app.listen(3000);


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserSchema = require('./User.model');

const appp = express();

// Import User model based on the schema
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://AuthSystem:AuthSystem%40123@authsystem.7sbn5ra.mongodb.net/1111', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Parse JSON bodies
appp.use(bodyParser.json());

// Route to handle POST requests to update distance for a user
appp.post('/update-distance', async (req, res) => {
    const { username } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });

        if (user) {
            // Update the distance field of the existing user
            user.distance = dist;
            await user.save();

            res.status(200).send('Distance updated successfully');
        } else {
            // User not found
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating distance:', error);
        res.status(500).send('Internal server error');
    }
});

// Start the server
const porta = 8000;
appp.listen(porta, () => {
    console.log(`Server is running on port ${port}`);
});

