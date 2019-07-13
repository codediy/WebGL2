function initGL(el="#webgl")
{
    const canvas = document.querySelector(el);
    const gl = canvas.getContext('webgl');
    if (!gl) {
        e("获取webgl失败");
        return false;
    }


    return [canvas,gl];
}

// 读取Shader程序
function initShaders(gl,vShaderId="#v-shader",fShaderId="#f-shader"){
    // 读取着色器程序
    let vScript = document.querySelector(vShaderId);
   

    let fScript = document.querySelector(fShaderId);

    if(!vScript || !fScript){
      e("ShaderScript错误");
      return false;
    }
    // 顶点着色器编译
    let vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader,vScript.textContent);
    gl.compileShader(vShader);
    // 片段着色器编译
    let fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader,fScript.textContent);
    gl.compileShader(fShader);

    if(!gl.getShaderParameter(vShader,gl.COMPILE_STATUS) 
      || !gl.getShaderParameter(fShader,gl.COMPILE_STATUS) ){
        e("Shader编译错误",gl.getShaderParameter(vShader,gl.COMPILE_STATUS),gl.getShaderParameter(fShader,gl.COMPILE_STATUS));
      }
    
    // 链接着色器程序
    let program = gl.createProgram();
    
    gl.attachShader(program,vShader);
    gl.attachShader(program,fShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
      e("Program链接错误");
    }
    gl.useProgram( program );
    
    return program;
}
function l(...e){
    console.log(...e);
}

function e(...e){
    console.error(...e);
}






