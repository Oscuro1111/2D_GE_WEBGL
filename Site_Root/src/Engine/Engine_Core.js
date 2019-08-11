'use strict'; //Operate in strict mode

var gEngine = gEngine || {}; //Initializing the variable while ensuring it is not redefined

gEngine.Core = (function() {
	//Instance variable :the graphical context for drowing
	var mGL = null;

	//Accsser for webGL context
	var getGL = function() {
		return mGL;
	};

	var initializeWebGL = function(htmlCanvasID) {
		var canvas = document.getElementById(htmlCanvasID);
		//Get the standared or expermental  webGL and bind it to the canvas area
		//store the result into instance variable in mGL
		mGL = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		if (mGL === null) {
			document.write('<br><h2><b>WebGL is Not Supported!</b></h2>');
			return;
		}

		//Now initialize the VerexBuffer

		gEngine.VertexBuffer.initialize();
	};

	//Clear the draw area and draw the Square
	var clearCanvas = function(color) {
		mGL.clearColor(color[0], color[1], color[2], color[3]); //set the color to be cleared
		mGL.clear(mGL.COLOR_BUFFER_BIT); //Clear the color previously set
	};
	//Containes the functions and variables that will be accessible
	var mPublic = {
		getGL: getGL,
		InitializeWebGL: initializeWebGL,
		clearCanvas: clearCanvas
	};
	return mPublic;
})();
