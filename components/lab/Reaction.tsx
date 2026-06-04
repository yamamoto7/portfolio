"use client";

import { useEffect, useRef, useState } from "react";
import {
  getGL,
  enableFloat,
  createDoubleFBO,
  makeRenderer,
  createPass,
  canvasTexture,
  textCanvas,
  type DoubleFBO,
} from "@/lib/lab/glu";
import Chrome from "./Chrome";

// Gray-Scott reaction–diffusion. The B chemical is seeded inside the name,
// so the Turing pattern grows outward from the letters.

const INIT = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_mask; uniform vec2 u_maskScale; out vec4 o;
float h(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
void main(){
  vec2 muv = (v_uv-0.5)*u_maskScale + 0.5;
  float m = (muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) ? texture(u_mask, muv).a : 0.0;
  float speck = step(0.9975, h(v_uv*131.0));   // a few stray seeds
  float B = max(step(0.5, m), speck);
  o = vec4(1.0, B, 0.0, 1.0);
}`;

const STEP = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_state; uniform vec2 u_texel;
uniform float u_f, u_k, u_da, u_db, u_dt; out vec4 o;
void main(){
  vec2 uv = v_uv;
  vec2 s = texture(u_state, uv).xy;
  vec2 lap = vec2(0.0);
  lap += texture(u_state, uv+vec2(u_texel.x,0.)).xy * 0.2;
  lap += texture(u_state, uv-vec2(u_texel.x,0.)).xy * 0.2;
  lap += texture(u_state, uv+vec2(0.,u_texel.y)).xy * 0.2;
  lap += texture(u_state, uv-vec2(0.,u_texel.y)).xy * 0.2;
  lap += texture(u_state, uv+u_texel).xy * 0.05;
  lap += texture(u_state, uv-u_texel).xy * 0.05;
  lap += texture(u_state, uv+vec2(u_texel.x,-u_texel.y)).xy * 0.05;
  lap += texture(u_state, uv+vec2(-u_texel.x,u_texel.y)).xy * 0.05;
  lap -= s;
  float A = s.x, B = s.y;
  float r = A*B*B;
  float da = u_da*lap.x - r + u_f*(1.0-A);
  float db = u_db*lap.y + r - (u_k+u_f)*B;
  o = vec4(clamp(s + vec2(da,db)*u_dt, 0.0, 1.0), 0.0, 1.0);
}`;

const SEED = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_state; uniform vec2 u_point;
uniform float u_radius, u_aspect; out vec4 o;
void main(){
  vec2 s = texture(u_state, v_uv).xy;
  vec2 p = v_uv - u_point; p.x *= u_aspect;
  s.y = min(1.0, s.y + exp(-dot(p,p)/u_radius));
  o = vec4(s, 0.0, 1.0);
}`;

const DISPLAY = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_state; uniform float u_time; out vec4 o;
void main(){
  float B = texture(u_state, v_uv).y;
  float e = fwidth(B);
  vec3 c1 = vec3(0.02,0.03,0.08);
  vec3 c2 = vec3(0.05,0.45,0.7);
  vec3 c3 = vec3(0.6,1.0,0.85);
  vec3 col = mix(c1, c2, smoothstep(0.05,0.3,B));
  col = mix(col, c3, smoothstep(0.3,0.55,B));
  // glowing membrane on the boundary
  float edge = smoothstep(0.0, 0.25, B) * (1.0 - smoothstep(0.25, 0.5, B));
  col += edge * vec3(0.3,0.9,1.0) * 0.6;
  o = vec4(col, 1.0);
}`;

export default function Reaction() {
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
    const R = makeRenderer(gl);

    const mobile = window.innerWidth < 768;
    const BASE = mobile ? 240 : 380;
    const ITERS = mobile ? 8 : 14;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const maskTex = canvasTexture(gl, textCanvas("KENTA", "YAMAMOTO"));

    let state: DoubleFBO;
    let texel: [number, number] = [1, 1];
    let aspect = 1;

    const init = createPass(gl, INIT);
    const step = createPass(gl, STEP);
    const seed = createPass(gl, SEED);
    const display = createPass(gl, DISPLAY);

    function maskScale(): [number, number] {
      return aspect >= 2 ? [aspect / 2, 1] : [1, 2 / aspect];
    }
    function reset() {
      init.use({ mask: { tex: maskTex, unit: 0 }, maskScale: maskScale() });
      R.blit(state.write);
      state.swap();
    }
    function alloc() {
      aspect = window.innerWidth / window.innerHeight;
      const w = aspect >= 1 ? Math.round(BASE * aspect) : BASE;
      const h = aspect >= 1 ? BASE : Math.round(BASE / aspect);
      texel = [1 / w, 1 / h];
      state = createDoubleFBO(
        gl!,
        w,
        h,
        gl!.RGBA16F,
        gl!.RGBA,
        gl!.HALF_FLOAT,
        gl!.LINEAR
      );
      reset();
    }

    function resize() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      alloc();
    }
    resize();
    window.addEventListener("resize", resize);

    const ptr = { x: 0, y: 0, on: false };
    function onMove(e: PointerEvent) {
      ptr.x = e.clientX / window.innerWidth;
      ptr.y = 1 - e.clientY / window.innerHeight;
      ptr.on = true;
    }
    const onUp = () => (ptr.on = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onUp);

    let raf = 0;
    const start = performance.now();
    let lastReset = start;

    function frame(now: number) {
      const g = gl!;
      g.bindVertexArray(R.quad);

      if (ptr.on) {
        seed.use({
          state: { tex: state.read.tex, unit: 0 },
          point: [ptr.x, ptr.y],
          radius: 0.0006,
          aspect,
        });
        R.blit(state.write);
        state.swap();
        ptr.on = false;
      }

      for (let i = 0; i < ITERS; i++) {
        step.use({
          state: { tex: state.read.tex, unit: 0 },
          texel,
          f: 0.037,
          k: 0.06,
          da: 1.0,
          db: 0.5,
          dt: 1.0,
        });
        R.blit(state.write);
        state.swap();
      }

      display.use({ state: { tex: state.read.tex, unit: 0 }, time: (now - start) / 1000 });
      R.blit(null);

      // loop: regrow every 26s
      if (now - lastReset > 26000) {
        lastReset = now;
        reset();
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onUp);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <Chrome
        title="04 · reaction-diffusion"
        hint="名前の形に蒔かれた種から、チューリング模様が生命のように増殖します。触れると種が増えます。"
      />
      {unsupported && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}
