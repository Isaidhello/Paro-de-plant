
/// CODE FOR COMMUNCATION WITH THE CLIENT


// Server listens for socket.io communication at port 8000
var io = require('socket.io').listen(8000); 

io.sockets.on('connection', function (socket) {
	console.log('connected');

	// If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
    	console.log(msg);
    });

    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
    	console.log('disconnected');
    });
});



/// CODE FOR COMMUNICATION WITH THE HCSR04 INPUT ON ARDUINO

// Initialize the board with Johnny Five code to open connection with Arduino
var five = require("johnny-five");
var board = new five.Board();

// The input on the board is attached to pin two
var pin = 2;

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {

	var ping = new five.Ping(pin);
    ping.on("change", function( err, value ) {
        io.sockets.emit('message', this.cm);
    });

});

