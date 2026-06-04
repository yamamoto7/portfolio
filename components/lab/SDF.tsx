"use client";

import { useEffect, useRef, useState } from "react";
import {
  getGL,
  makeRenderer,
  createPass,
  canvasTexture,
  textCanvas,
} from "@/lib/lab/glu";
import Chrome from "./Chrome";

// Pure-shader raymarched glass blob. No polygons — the whole 3D object is
// an SDF. The name lives in the background and is refracted through the glass.

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform float u_time, u_aspect;
uniform vec2 u_mouse, u_maskScale;
uniform sampler2D u_name;
out vec4 o;

vec3 background(vec2 uv){
  vec3 col = mix(vec3(0.05,0.05,0.09), vec3(0.10,0.07,0.16), uv.y);
  col += 0.04*vec3(0.4,0.6,1.0)*smoothstep(0.7,0.0,length(uv-0.5));
  vec2 muv = (uv-0.5)*u_maskScale + 0.5;
  float m = (muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) ? texture(u_name, muv).a : 0.0;
  col = mix(col, vec3(0.55,0.8,1.0), m*0.85);
  return col;
}

float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

float map(vec3 p){
  float t = u_time;
  float d = 1e5;
  for(int i=0;i<5;i++){
    float fi = float(i);
    vec3 c = vec3(sin(t*0.6+fi*1.7), cos(t*0.5+fi*2.1), sin(t*0.4+fi*1.1)) * 0.6;
    d = smin(d, length(p-c)-0.52, 0.55);
  }
  d += 0.035*sin(p.x*6.0+t)*sin(p.y*6.0+t*1.3)*sin(p.z*6.0+t*0.7);
  return d;
}

vec3 normalAt(vec3 p){
  vec2 e = vec2(0.0012, 0.0);
  return normalize(vec3(
    map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy),
    map(p+e.yyx)-map(p-e.yyx)));
}

void main(){
  vec2 uv = v_uv;
  vec2 p = uv*2.0-1.0; p.x *= u_aspect;

  vec3 ro = vec3(0.0, 0.0, -3.2);
  vec3 rd = normalize(vec3(p, 1.7));
  float ax = u_time*0.12 + u_mouse.x*0.7;
  float ay = u_mouse.y*0.5;
  mat2 ry = mat2(cos(ax),-sin(ax),sin(ax),cos(ax));
  ro.xz *= ry; rd.xz *= ry;
  mat2 rx = mat2(cos(ay),-sin(ay),sin(ay),cos(ay));
  ro.yz *= rx; rd.yz *= rx;

  float t = 0.0; bool hit = false; vec3 pos;
  for(int i=0;i<90;i++){
    pos = ro + rd*t;
    float d = map(pos);
    if(d < 0.001){ hit = true; break; }
    if(t > 9.0) break;
    t += d;
  }

  vec3 col;
  if(hit){
    vec3 n = normalAt(pos);
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    vec2 ruv = uv + n.xy*0.16;                 // refract background
    vec3 refr = background(ruv);
    vec3 ldir = normalize(vec3(0.6,0.8,-0.6));
    float spec = pow(max(dot(reflect(rd,n), ldir), 0.0), 48.0);
    vec3 tint = vec3(0.45,0.78,1.0);
    col = refr*tint*1.15 + fres*vec3(0.5,0.65,1.0)*1.2 + spec*vec3(1.0);
  } else {
    col = background(uv);
  }
  col = col/(1.0+col*0.5);
  col = pow(col, vec3(0.85));
  o = vec4(col, 1.0);
}`;

export default function SDF() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = getGL(canvas);
    if (!gl) {
      setUnsupported(true);
      return;
    }
    const R = makeRenderer(gl);
    const pass = createPass(gl, FRAG);
    const nameTex = canvasTexture(gl, textCanvas("KENTA", "YAMAMOTO"));

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    function resize() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(e: PointerEvent) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const start = performance.now();
    function frame(now: number) {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const aspect = window.innerWidth / window.innerHeight;
      const maskScale: [number, number] =
        aspect >= 2 ? [aspect / 2, 1] : [1, 2 / aspect];
      pass.use({
        time: (now - start) / 1000,
        aspect,
        mouse: [mouse.x, mouse.y],
        maskScale,
        name: { tex: nameTex, unit: 0 },
      });
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
        title="03 · raymarch sdf"
        hint="ポリゴンを使わず、シェーダー内だけで生成したガラスの塊。動かすと背景の名前が屈折します。"
      />
      {unsupported && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}
