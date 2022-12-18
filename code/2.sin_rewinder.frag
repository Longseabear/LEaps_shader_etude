// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592
#define TWO_PI 6.28318530718
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float plot(vec2 st, float pct){
    return smoothstep(pct-0.01, pct, st.y)
        - smoothstep(pct, pct+0.01, st.y);
}
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x / u_resolution.y;
    uv *= 2.0;
    
    vec3 color = vec3(0.0);
    float l = length(uv);
    float angle = atan(uv.y, uv.x) + u_time;

    vec2 new_coord = vec2(angle, l);
    float y = cos(new_coord.x * 10.0);
    
    // 120도를 기점으로
    color = mix(color, vec3(1.0,1.0,1.0), step(new_coord.y, y));

    color = mix(color, vec3(0.5,1.0,1.0), plot(uv, cos(((uv.x)*TWO_PI * 0.5)) * 0.5));
    gl_FragColor = vec4(color, 1.0);
}
