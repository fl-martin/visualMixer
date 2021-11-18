#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_low;
uniform float u_bpm;

#include "lygia/space/ratio.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/draw/rect.glsl"
#include "lygia/color/hueShift.glsl"

float sinbpm = sin(u_time * PI * (u_bpm / 60.));
float sinbpm4 = sin(u_time * PI * (u_bpm / 60.) /  8.);
float cosbpm4 = sin(u_time * PI * (u_bpm / 60.) /  8.);

vec2 position() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st,u_resolution);
    st = st *2.-1.;
    return st;
}

vec3 colorA = vec3(0.7,0.,sinbpm4 * 2.);
vec3 colorB = vec3(u_low / 155.,abs(sinbpm4), 0.2);

void main() {
    vec2 st = position();

    float square = rect(st + vec2(.5,.5), vec2(1.2));

    square *= snoise(vec3(st * (u_low / 120.) , u_time));

    float radio = distance(st, vec2(0.));
    float angulo = atan(st.y * sinbpm4,st.x);
    
    vec2 polar = vec2(radio, angulo);

    vec3 strips = vec3(smoothstep(0.3,0.5,abs(sin(polar.y * u_low / 155.-u_low / 255.))));
    vec3 growCircle = vec3(smoothstep(0.0,1.,abs(sin(polar.x * u_low / 155.-u_low / 255.)) * 1.));

    vec3 color = square + mix(colorA, colorB, growCircle) * 2.;

    gl_FragColor = vec4(color,1.0);
}