'use strict';
var gEngine = gEngine || {};

// The VertexBuffer Object
gEngine.VertexBuffer = (function() {
	// First: define the vertices for a square
	var verticesOfSquare = [0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0];

	// refrence to the vertex posiotion for the square in the gl Context
	var mSquareVertexBuffer = null;

	var getGLVertexRef = function() {
		return mSquareVertexBuffer;
	};

	var initialize = function() {
		var gl = gEngine.Core.getGL();

		//Step A : Create a buffer on gl Context  for Our vertex positions
		mSquareVertexBuffer = gl.createBuffer();

		//step B: Activate Vertex Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

		// Step C: Loads verticesOfSquare into the vertexBuffer
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };
    
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
        };

        return mPublic;
})();
