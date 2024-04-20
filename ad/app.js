var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var SerialPort = require("serialport");
var socketIO = require("socket.io");

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
            socket.emit('distance', { distance: distance });
            console.log(distance);
        } else {
            console.error('data received:', data);
        }
    });
});


app.listen(3000);
