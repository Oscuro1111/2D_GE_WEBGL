'use strict';

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // instance variables (Convention: all instance variables: mVariables)

    this.mCompiledShader = null;
    //Refrenced to the compiled shader in webgl Context

    this.mShaderVertexPositionAttribute = null;
    // Reference to SquareVertexPosiotion shader

    var gl = gEngine.Core.getGL();
    //Start of Constructor Code

    // Step A: load and compile vertex and fragment shaders
    var vertexShader = this._loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    // Step B: Create and link the shaders into a program.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);


    // Step C: check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");

    // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    //  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());


    // Step F: Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3, // each element is a 3-float (x,y.z)
        gl.FLOAT, // data type is FLOAT
        false, // if the content is normalized vectors
        0, // number of bytes to skip in between elements
        0); // offsets to the first element
}


// Returns a complied shader from a shader in the dom.
// The id is the id of the script in the html tag.
SimpleShader.prototype._loadAndCompileShader = function (filePath, shaderType) {
    var shaderText, shaderSource=null, compiledShader;
    var gl = gEngine.Core.getGL();
    // Step A: Get the shader source from index.html

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", filePath, false); //ASync : false or Sync function

    try {
        xhttp.send();
    } catch (error) {
        alert("Failed to load Shader" + filePath);
        return null;
    }
    shaderSource = xhttp.responseText;

    if(shaderSource===null|| xhttp.readyState!==4||xhttp.status!==200){
        alert("WARNING:"+filePath+"faled to load!!");
        return null;
    }

    //shaderText = document.getElementById(id);
    //shaderSource = shaderText.firstChild.textContent;


    // Step B: Create the shader based on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
            gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
};

SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

SimpleShader.prototype.getShader = function () {
    return this.mCompiledShader;
};