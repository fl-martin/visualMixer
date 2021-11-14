#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_low;
uniform float u_bpm;

#include "lygia/draw/rect.glsl"
#include "lygia/draw/circle.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/color/blend/softLight.glsl"

float sinbpm = sin(u_time * PI * (u_bpm / 60.));
float sinbpm4 = sin(u_time * PI * (u_bpm / 60.) /  4.);
float cosbpm4 = sin(u_time * PI * (u_bpm / 60.) /  4.);

vec3 colorA = vec3(u_low / 255.,0.0,u_low / 255.);
vec3 colorB = vec3(u_low / 255.,0.0,0.0);
vec3 colorC = vec3(.1,.1,.4);
vec3 colorD = vec3(0.0,u_low / 455.,0.0);


float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    st = ratio(st,u_resolution);



    vec3 pct = vec3(st.x);

    pct.g = smoothstep(0.0,u_low / 255.,st.y / (abs(sin(st.x * (sin(u_time * 0.01) * 50.))) + 1.0)) * 2.;
    pct.b = smoothstep(0.0,u_low / 255.,st.x / (abs(sin(st.y * (sin(u_time * 0.01) * 50.))) + 1.0)) * 2.;

     vec3 backgr = mix(colorA, colorB, st.y + sin(u_time));
     vec3 cross1 = rect(st, .6) - colorD * 2.;
     vec3 circle1 = circle(st, .7) - colorD;
     vec3 spines1 = vec3(pct.g * clamp(abs(sinbpm4), 0.4, 0.9 ))  - vec3(0.,.5,.2)  ;
     vec3 spines2 = vec3(pct.b * clamp(abs(sinbpm4), 0.4, 0.5 ))  - vec3(0.,.5,1.) ;

     color =  (spines1 + spines2) + backgr * .7 ;
    gl_FragColor = vec4(color,1.0);
}