$(document).ready(function(){

	// Initialize Flot data points
	var totalPoints = 200;
	var res = [];
	function getInitData() {
		// zip the generated y values with the x values
		for (var i = 0; i < totalPoints; ++i) {
			res.push([i, 0]);
		}
		return res;
	}

	// Options for Flot plot
	var options = {
		series: { shadowSize: 0 }, // drawing is faster without shadows
		yaxis: { min: 0, max: totalPoints },
		xaxis: { show: false }
	};
	var plot = $.plot($("#placeholder"), [ getInitData() ], options);
	
	// Update the JQuery UI Progress Bar
	$( "#progressbar" ).progressbar( {
		value: 0
	});

    var socket = io('http://localhost:8000');
	socket.on('connect', function () {
		socket.on('message', function (msg) {

			// Convert value to integer
			var val = parseInt(msg);
			
			// Put sensor value to the 'sensor_value' span
			$('#sensor_value').html(val + ' cm');
			
			// Push new value to Flot Plot
			res.push([totalPoints, val]); // push on the end side
			res.shift(); // remove first value to maintain totalPoints

			// Reinitialize the x axis data points to 0 to totalPoints-1.
			for (i = 0; i < totalPoints; i++) { 
				res[i][0] = i; 
			}

			// Redraw the plot
			plot.setData([ res ]);
			plot.draw();
			
			// Update JQuery UI progress bar.
			$( "#progressbar" ).progressbar( {
				value: val
			});

			// Convert the value to a color
	        var color = (val * 5) - 20; 
	        color = color < 0 ? 0 : color > 255 ? 255 : color;

			// Update background color of the body
			$("body").css("background-color", "rgb(" + color + "," + color + "," + color + ")" );
		});
	});
});
