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

// Render-to-texture feedback loop: every frame samples the previous frame at
// a slightly zoomed+rotated UV, building an infinite kaleidoscopic tunnel.
// The name is injected at the center and gets sucked into the depths.

const FEEDBACK = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_prev, u_name;
uniform float u_time, u_aspect;
uniform vec2 u_mouse, u_maskScale;
out vec4 o;

mat2 rot(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }

void main(){
  vec2 c = vec2(0.5) + u_mouse*0.12;
  vec2 uv = v_uv - c;
  uv.x *= u_aspect;
  uv = rot(0.05) * uv * 0.986;        // zoom + swirl -> tunnel
  uv.x /= u_aspect;
  uv += c;

  vec3 prev = texture(u_prev, uv).rgb;
  // slow hue drift so the tunnel cycles colors
  vec3 tint = 0.5 + 0.5*cos(u_time*0.3 + vec3(0.0,2.1,4.2));
  prev *= mix(vec3(1.0), tint, 0.06);
  prev *= 0.955;                       // fade so it never saturates

  // inject the name at full depth
  vec2 muv = (v_uv-0.5)*u_maskScale + 0.5;
  float m = (muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) ? texture(u_name, muv).a : 0.0;
  float pulse = 0.55 + 0.45*sin(u_time*1.6);
  vec3 inject = m * pulse * vec3(0.6,0.95,1.0);

  // concentric travelling rings
  float d = length((v_uv-0.5)*vec2(u_aspect,1.0));
  float ring = smoothstep(0.03,0.0,abs(fract(d*5.0 - u_time*0.4)-0.5)-0.46);
  inject += ring * vec3(1.0,0.35,0.8) * 0.25;

  vec3 col = prev + inject;
  o = vec4(col, 1.0);
}`;

const COPY = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_tex; out vec4 o;
void main(){
  vec3 c = texture(u_tex, v_uv).rgb;
  c = c/(1.0+c*0.6);
  c = pow(c, vec3(0.9));
  o = vec4(c, 1.0);
}`;

export default function Feedback() {
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
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    const nameTex = canvasTexture(gl, textCanvas("KENTA", "YAMAMOTO"));

    let buf: DoubleFBO;
    let aspect = 1;

    const feedback = createPass(gl, FEEDBACK);
    const copy = createPass(gl, COPY);

    function alloc() {
      aspect = window.innerWidth / window.innerHeight;
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      buf = createDoubleFBO(gl!, w, h, gl!.RGBA16F, gl!.RGBA, gl!.HALF_FLOAT, gl!.LINEAR);
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

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(e: PointerEvent) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove);

    function maskScale(): [number, number] {
      return aspect >= 2 ? [aspect / 2, 1] : [1, 2 / aspect];
    }

    let raf = 0;
    const start = performance.now();
    function frame(now: number) {
      const g = gl!;
      g.bindVertexArray(R.quad);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      feedback.use({
        prev: { tex: buf.read.tex, unit: 0 },
        name: { tex: nameTex, unit: 1 },
        time: (now - start) / 1000,
        aspect,
        mouse: [mouse.x, mouse.y],
        maskScale: maskScale(),
      });
      R.blit(buf.write);
      buf.swap();

      copy.use({ tex: { tex: buf.read.tex, unit: 0 } });
      R.blit(null);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <Chrome
        title="05 · feedback"
        hint="前のフレームを描き戻し続けて生まれる無限トンネル。動かすと奥行きが渦を巻きます。"
      />
      {unsupported && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}
