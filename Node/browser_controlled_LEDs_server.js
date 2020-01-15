var io = require('socket.io').listen(8000); 
var five = require("johnny-five");
var board = new five.Board();

io.sockets.on('connection', function (socket)
{
    socket.on('toggleLed', function (msg)
    {
    	console.log(msg);
        if(msg == 'groen-on')
        {
           groen.on();
        }
        else if(msg == 'groen-off')
        {
            groen.off();
        }
        
        if(msg == 'rood-on')
        {
           rood.on();
        }
        else if(msg == 'rood-off')
        {
            rood.off();
        }
    });
});


board.on("ready", function()
{
    groen = new five.Led(13);
    rood = new five.Led(12);
});