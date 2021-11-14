#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_low;

#include "lygia/space/ratio.glsl"

vec2 position() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st,u_resolution);
    st = st *2.-1.;
    return st;
}

vec3 colorA = vec3(0.6,0.,0.6);
vec3 colorB = vec3(u_low / 155.,0.0,0.0);

void main() {
    vec2 st = position();

    float radio = distance(st, vec2(0.));
    float angulo = atan(st.y,st.x);
    
    vec2 polar = vec2(radio, angulo);

    vec3 growCircle = vec3(smoothstep(0.3,0.9,abs(sin(polar.x * u_low / 155.-u_low / 255.))));

    vec3 color = mix(colorA, colorB, growCircle);

    gl_FragColor = vec4(color,1.0);
}