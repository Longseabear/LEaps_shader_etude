#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.868,0.068);

float plot(vec2 st, float pct){
    return smoothstep(pct-0.01, pct, st.y) - 
        smoothstep(pct, pct+0.01, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);
    
    vec3 pct = vec3(st.x);
    pct.r = smoothstep(0.0, 1.0, abs(sin(pow(u_time, 1.0))));
    pct.g = pow(st.x, abs(mod(u_time, 4.0)-2.0));
    pct.b = (cos(st.x * -6.356 + u_time) + 1.0) / 2.0;
    
    color = mix(colorA, colorB, pct);
    
    color = mix(color, vec3(1.0,0.0,0.0), plot(st, pct.r));
    color = mix(color, vec3(0.0,1.0,0.0), plot(st, pct.g));
    color = mix(color, vec3(0.0,0.0,1.0), plot(st, pct.b));
    
    gl_FragColor = vec4(color, 1.0);
}