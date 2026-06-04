"use client";

import { useEffect, useRef, useState } from "react";
import {
  getGL,
  program,
  makeQuad,
  createDoubleFBO,
  enableFloat,
  textPoints,
  QUAD_VERT,
  type GL,
} from "@/lib/lab/glu";
import Chrome from "./Chrome";

const WORDS = ["KENTA", "YAMAMOTO", "BACKEND", "ENGINEER"];

// ---- shaders -----------------------------------------------------------

const NOISE = `
float hash21(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  float a=hash21(i), b=hash21(i+vec2(1,0)), c=hash21(i+vec2(0,1)), d=hash21(i+vec2(1,1));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
vec2 curl(vec2 p){
  float e=0.12;
  float n1=vnoise(p+vec2(0.0,e)), n2=vnoise(p-vec2(0.0,e));
  float n3=vnoise(p+vec2(e,0.0)), n4=vnoise(p-vec2(e,0.0));
  return vec2(n1-n2, n4-n3)/(2.0*e);
}`;

const INIT_FRAG = `#version 300 es
precision highp float;
out vec4 o;
float h(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
void main(){
  vec2 uv = gl_FragCoord.xy;
  float a = h(uv)*6.2831853;
  float r = sqrt(h(uv+7.0));
  o = vec4(vec2(cos(a),sin(a))*r*1.2, 0.0, 0.0);
}`;

const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform sampler2D u_tgtA;
uniform sampler2D u_tgtB;
uniform float u_morph;
uniform float u_time;
uniform float u_dt;
uniform vec2 u_pointer;
uniform float u_pointerOn;
out vec4 o;
${NOISE}
void main(){
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec4 st = texelFetch(u_state, p, 0);
  vec2 pos = st.xy, vel = st.zw;
  vec2 tgt = mix(texelFetch(u_tgtA,p,0).xy, texelFetch(u_tgtB,p,0).xy, u_morph);

  vec2 acc = (tgt - pos) * 7.0;                 // spring toward letter shape
  acc += curl(pos*1.6 + u_time*0.18) * 2.2;     // turbulent swirl

  if(u_pointerOn > 0.5){
    vec2 d = pos - u_pointer;
    float dist = length(d) + 1e-4;
    acc += normalize(d) * exp(-dist*dist*7.0) * 11.0;  // vortex push
  }

  vel += acc * u_dt;
  vel *= 0.88;
  pos += vel * u_dt;
  o = vec4(pos, vel);
}`;

const RENDER_VERT = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_texSize;
uniform vec2 u_scale;
uniform float u_pt;
out float v_speed;
void main(){
  int id = gl_VertexID;
  int w = int(u_texSize.x);
  ivec2 uv = ivec2(id % w, id / w);
  vec4 st = texelFetch(u_state, uv, 0);
  v_speed = length(st.zw);
  gl_Position = vec4(st.xy * u_scale, 0.0, 1.0);
  gl_PointSize = u_pt;
}`;

const RENDER_FRAG = `#version 300 es
precision highp float;
in float v_speed;
out vec4 o;
void main(){
  vec2 c = gl_PointCoord*2.0-1.0;
  float m = smoothstep(1.0, 0.0, dot(c,c));
  float s = clamp(v_speed*2.5, 0.0, 1.0);
  vec3 calm = vec3(0.15, 0.85, 0.78);
  vec3 hot  = vec3(1.0, 0.35, 0.75);
  vec3 col = mix(calm, hot, s);
  o = vec4(col * m, m);
}`;

const COPY_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_fade;
out vec4 o;
void main(){ o = texture(u_tex, v_uv) * u_fade; }`;

// -----------------------------------------------------------------------

function buildTargetTex(gl: GL, word: string, count: number, w: number) {
  const { positions } = textPoints(word, count);
  const data = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    data[i * 4] = positions[i * 2];
    data[i * 4 + 1] = positions[i * 2 + 1];
  }
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, w, count / w, 0, gl.RGBA, gl.FLOAT, data);
  return tex;
}

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = getGL(canvas);
    if (!gl) {
      setUnsupported(true);
      return;
    }
    enableFloat(gl);

    const mobile = window.innerWidth < 768;
    const TW = mobile ? 256 : 512;
    const TH = mobile ? 144 : 288;
    const COUNT = TW * TH;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const state = createDoubleFBO(gl, TW, TH, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.NEAREST);
    const targets = WORDS.map((w) => buildTargetTex(gl, w, COUNT, TW));

    const quad = makeQuad(gl);
    const emptyVao = gl.createVertexArray()!;

    const initP = program(gl, QUAD_VERT, INIT_FRAG);
    const simP = program(gl, QUAD_VERT, SIM_FRAG);
    const renderP = program(gl, RENDER_VERT, RENDER_FRAG);
    const copyP = program(gl, QUAD_VERT, COPY_FRAG);

    // glow accumulation buffer (so trails persist a frame)
    let glow = createDoubleFBO(gl, 1, 1, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, gl.LINEAR);

    function resize() {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      // recreate glow buffers at screen res
      glow = createDoubleFBO(gl!, w, h, gl!.RGBA16F, gl!.RGBA, gl!.HALF_FLOAT, gl!.LINEAR);
    }
    resize();
    window.addEventListener("resize", resize);

    function scaleVec(): [number, number] {
      const a = window.innerWidth / window.innerHeight;
      return a >= 1 ? [1 / a, 1] : [1, a];
    }

    // pointer in simulation space
    const pointer = { x: 0, y: 0, on: 0 };
    function setPointer(cx: number, cy: number, on: number) {
      const sx = (cx / window.innerWidth) * 2 - 1;
      const sy = -((cy / window.innerHeight) * 2 - 1);
      const [a, b] = scaleVec();
      pointer.x = sx / a;
      pointer.y = sy / b;
      pointer.on = on;
    }
    const onMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY, 1);
    const onLeave = () => (pointer.on = 0);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("pointerleave", onLeave);

    function drawQuad() {
      gl!.bindVertexArray(quad);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    // init state
    gl.useProgram(initP);
    gl.bindFramebuffer(gl.FRAMEBUFFER, state.read.fb);
    gl.viewport(0, 0, TW, TH);
    drawQuad();

    const uSim = {
      state: gl.getUniformLocation(simP, "u_state"),
      tgtA: gl.getUniformLocation(simP, "u_tgtA"),
      tgtB: gl.getUniformLocation(simP, "u_tgtB"),
      morph: gl.getUniformLocation(simP, "u_morph"),
      time: gl.getUniformLocation(simP, "u_time"),
      dt: gl.getUniformLocation(simP, "u_dt"),
      pointer: gl.getUniformLocation(simP, "u_pointer"),
      pointerOn: gl.getUniformLocation(simP, "u_pointerOn"),
    };
    const uRender = {
      state: gl.getUniformLocation(renderP, "u_state"),
      texSize: gl.getUniformLocation(renderP, "u_texSize"),
      scale: gl.getUniformLocation(renderP, "u_scale"),
      pt: gl.getUniformLocation(renderP, "u_pt"),
    };
    const uCopy = {
      tex: gl.getUniformLocation(copyP, "u_tex"),
      fade: gl.getUniformLocation(copyP, "u_fade"),
    };

    let raf = 0;
    let prev = performance.now();
    const start = prev;
    let wordIdx = 0;

    function frame(now: number) {
      const g = gl!;
      let dt = (now - prev) / 1000;
      prev = now;
      dt = Math.min(dt, 0.033);
      const elapsed = (now - start) / 1000;

      // morph schedule: 3.2s settle, 1.0s morph
      const CYCLE = 4.2;
      const phase = elapsed % CYCLE;
      wordIdx = Math.floor(elapsed / CYCLE) % WORDS.length;
      const morph = phase < 3.2 ? 0 : Math.min((phase - 3.2) / 1.0, 1);
      const a = targets[wordIdx];
      const b = targets[(wordIdx + 1) % WORDS.length];

      // --- simulate ---
      g.useProgram(simP);
      g.bindFramebuffer(g.FRAMEBUFFER, state.write.fb);
      g.viewport(0, 0, TW, TH);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, state.read.tex);
      g.uniform1i(uSim.state, 0);
      g.activeTexture(g.TEXTURE1);
      g.bindTexture(g.TEXTURE_2D, a);
      g.uniform1i(uSim.tgtA, 1);
      g.activeTexture(g.TEXTURE2);
      g.bindTexture(g.TEXTURE_2D, b);
      g.uniform1i(uSim.tgtB, 2);
      g.uniform1f(uSim.morph, morph);
      g.uniform1f(uSim.time, elapsed);
      g.uniform1f(uSim.dt, dt);
      g.uniform2f(uSim.pointer, pointer.x, pointer.y);
      g.uniform1f(uSim.pointerOn, pointer.on);
      drawQuad();
      state.swap();

      // --- fade previous glow (trails) ---
      g.bindFramebuffer(g.FRAMEBUFFER, glow.write.fb);
      g.viewport(0, 0, glow.write.w, glow.write.h);
      g.useProgram(copyP);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, glow.read.tex);
      g.uniform1i(uCopy.tex, 0);
      g.uniform1f(uCopy.fade, 0.82);
      g.disable(g.BLEND);
      drawQuad();

      // --- draw particles additively on top of faded glow ---
      g.enable(g.BLEND);
      g.blendFunc(g.SRC_ALPHA, g.ONE);
      g.useProgram(renderP);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, state.read.tex);
      g.uniform1i(uRender.state, 0);
      g.uniform2f(uRender.texSize, TW, TH);
      const [sx, sy] = scaleVec();
      g.uniform2f(uRender.scale, sx, sy);
      g.uniform1f(uRender.pt, Math.max(1.0, dpr * (mobile ? 1.3 : 1.6)));
      g.bindVertexArray(emptyVao);
      g.drawArrays(g.POINTS, 0, COUNT);
      glow.swap();

      // --- present glow to screen ---
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      g.viewport(0, 0, canvas.width, canvas.height);
      g.disable(g.BLEND);
      g.useProgram(copyP);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, glow.read.tex);
      g.uniform1i(uCopy.tex, 0);
      g.uniform1f(uCopy.fade, 1.0);
      drawQuad();

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <Chrome
        title="01 · gpgpu particles"
        hint="数十万の粒子が名前を形づくり、技術タグへと崩れて再集合します。画面をドラッグ／タッチで渦を作れます。"
      />
      {unsupported && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}
