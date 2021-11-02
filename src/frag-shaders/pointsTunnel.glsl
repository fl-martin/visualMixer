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

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x, st.x, st.x);

 //   pct.r = smoothstep(0.,1.0, abs(sin(st.x - u_time)));
 //  pct.g =  abs(tan(st.x * (st.y + sin(u_time)) * PI + u_time) * 0.8)  ;
    pct.g =  abs(tan(st.x * (st.y + sin(u_low * 0.03)) * PI + u_time) * 0.8)  ;
  //  pct.r = abs(sin(st.y + u_low * 0.04));
    pct.b = abs(sin(st.y * (sin(u_time * 0.15) * 20.)) );

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    //color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    //color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    //color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}