
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/space/ratio.glsl"
#include "lygia/draw/cross.glsl"
#include "lygia/draw/circle.glsl"
#include "lygia/draw/rect.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st, u_resolution);

    

    color += circle(st, .5, .1) + circle(st, .1, .2);

    
    gl_FragColor = vec4(color, 1.0);
}