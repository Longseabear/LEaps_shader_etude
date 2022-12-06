#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 color2 = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = st-vec2(0.5);
    float angle = atan(toCenter.y, toCenter.x) + u_time;
    float angle2 = atan(toCenter.y, toCenter.x) - u_time;
    float radius = length(toCenter)*2.0; // 거리가 멀 수록 탁해지고, 거리가 가까울 수록 연해짐

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));
    color2 = hsb2rgb(vec3((angle2/TWO_PI)+0.5,radius,1.0));

    gl_FragColor = vec4(mix(color, color2, abs(sin(u_time))),1.0);
}