#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_low;

vec3 colorA = vec3(0.4,0.,0.6);
vec3 colorB = vec3(1.,0.2,0.0);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x, st.x, st.x);

    pct.r = smoothstep(0.,1.0, abs(sin(st.x - u_time)));
    pct.g =  abs(tan(st.x * (st.y + sin(u_time)) * PI + u_time) * 0.8)  ;
    pct.b = abs(sin(st.y * (sin(u_time * 0.15) * 20.)) );

   color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}