// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define RANGE(a, b, x, smooth) (smoothstep(a-smooth, a, x) - smoothstep(b, b+smooth, x))


vec2 rotate2D(vec2 _st, float _angle){
    _st = mat2(cos(_angle), -sin(_angle),
              sin(_angle), cos(_angle)) * _st;
    return _st;
}
vec2 tile(vec2 uv, vec2 scale){
    uv *= scale;
    return fract(uv);
}
float circle(vec2 uv, float r, float _smoothEdges){
    float l = length(uv);
    return 1.0 - smoothstep(r - _smoothEdges, r, l);
}
float box(vec2 uv, vec2 _size, float _smoothEdges){
    
    vec2 half_size = _size / 2.0;
    vec2 boxes = RANGE(-half_size, half_size, uv, vec2(_smoothEdges));
    
    return boxes.y * boxes.x;
}

float tiled_triangle(float x, float l){
    x /= l;
    return mod(1.0-abs(fract(x)/0.5-1.0), 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec2 w_uv = uv * vec2(10.0, 10.0);

    float isVertical = step(1.0, mod(u_time, 2.0));
    if (isVertical < 0.5){
        float identifer = step(1.0, mod(w_uv.y, 2.0));
        w_uv.x += tiled_triangle(u_time, 2.0) * identifer ;
        w_uv.x -= tiled_triangle(u_time, 2.0) * (1.0 - identifer);        
    }else{
        float identifer = step(1.0, mod(w_uv.x, 2.0));
        w_uv.y += tiled_triangle(u_time, 2.0) * identifer ;
        w_uv.y -= tiled_triangle(u_time, 2.0) * (1.0 - identifer);                
    }

    // w_uv.y += sin(u_time) * identifer;
    // w_uv.y -= sin(u_time) * (1.0 - identifer);

    uv = fract(w_uv);
    
    //uv.x += sin(u_time);
    
    vec3 color = vec3(0.0);
    vec3 base_color = vec3(uv, 0.0);
    
    color = vec3(1.0,1.0,1.0) * circle(uv-0.5, 0.3, 0.01);
    

	// color = vec3(1.0,1.0,1.0) * box(uv-0.5, vec2(0.02, 1.0), 0.01)+
	// vec3(1.0,1.0,1.0) * box(uv-0.5, vec2(1.0,0.02), 0.01);
	// uv = rotate2D(uv - 0.5, PI * 0.25);
	// color = mix(color, vec3(1.0) * (box(uv, vec2(0.25), 0.01)-box(uv, vec2(0.20), 0.01)), box(uv, vec2(0.25), 0.01)) ;
     
    gl_FragColor = vec4(color, 1.0);
}