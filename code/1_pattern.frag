#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.141592

uniform vec2 u_resolution;
uniform float u_time;

#define IMAGE_WIDTH u_resolution.x
#define IMAGE_HEIGHT u_resolution.y

float triangle_function(float x, float delta, float value){
    return smoothstep(x-delta, x, value) - smoothstep(x, x+delta, value);
}
void main(){
    vec2 norm_xy = gl_FragCoord.xy / u_resolution.xy - .5;
    float l = length(norm_xy);
    float t = u_time;
    
//    float y = ((sin(l * TWO_PI * 2.0 + t) + 1.0) / 2.0);
    float angle = atan(norm_xy[1], norm_xy[0]);
    float k = triangle_function(0.0, 0.1, sin((angle * 4.0 + t * 4.5 + sin(t * 2.0)*sin((l/0.1) * TWO_PI * 5.0 + t * 10.0))));
    float y = sin(l * 2.0 * TWO_PI * 2.0 + u_time * 10.0) * k;
    
    float result_color = y;
    
    gl_FragColor = vec4(vec3(result_color),1.0);
}