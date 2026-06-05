"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {
  getGL,
  enableFloat,
  createDoubleFBO,
  makeRenderer,
  createPass,
  canvasTexture,
  textCanvas,
  type DoubleFBO,
} from "./glu";

// Compact GPU fluid (advection + vorticity + Jacobi pressure), à la Stam.
// Extracted as a hook so both the pure demo and the portfolio page can share
// the exact same engine. The name is injected as dye so it lives in the flow.

const ADVECT = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_vel, u_src; uniform vec2 u_texel;
uniform float u_dt, u_diss; out vec4 o;
void main(){
  vec2 c = v_uv - u_dt * texture(u_vel, v_uv).xy * u_texel;
  o = u_diss * texture(u_src, c);
}`;

const DIVERGENCE = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_vel; uniform vec2 u_texel; out vec4 o;
void main(){
  float L = texture(u_vel, v_uv - vec2(u_texel.x,0.)).x;
  float R = texture(u_vel, v_uv + vec2(u_texel.x,0.)).x;
  float T = texture(u_vel, v_uv + vec2(0.,u_texel.y)).y;
  float B = texture(u_vel, v_uv - vec2(0.,u_texel.y)).y;
  o = vec4(0.5*(R-L+T-B), 0., 0., 1.);
}`;

const CURL = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_vel; uniform vec2 u_texel; out vec4 o;
void main(){
  float L = texture(u_vel, v_uv - vec2(u_texel.x,0.)).y;
  float R = texture(u_vel, v_uv + vec2(u_texel.x,0.)).y;
  float T = texture(u_vel, v_uv + vec2(0.,u_texel.y)).x;
  float B = texture(u_vel, v_uv - vec2(0.,u_texel.y)).x;
  o = vec4(0.5*((R-L)-(T-B)), 0., 0., 1.);
}`;

const VORTICITY = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_vel, u_curl; uniform vec2 u_texel;
uniform float u_curlAmt, u_dt; out vec4 o;
void main(){
  float L = texture(u_curl, v_uv - vec2(u_texel.x,0.)).x;
  float R = texture(u_curl, v_uv + vec2(u_texel.x,0.)).x;
  float T = texture(u_curl, v_uv + vec2(0.,u_texel.y)).x;
  float B = texture(u_curl, v_uv - vec2(0.,u_texel.y)).x;
  float c = texture(u_curl, v_uv).x;
  vec2 force = 0.5 * vec2(abs(T)-abs(B), abs(R)-abs(L));
  force /= length(force) + 1e-4;
  force *= u_curlAmt * c;
  force.y *= -1.0;
  vec2 vel = texture(u_vel, v_uv).xy + force * u_dt;
  o = vec4(clamp(vel, -1000., 1000.), 0., 1.);
}`;

const PRESSURE = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_pressure, u_div; uniform vec2 u_texel; out vec4 o;
void main(){
  float L = texture(u_pressure, v_uv - vec2(u_texel.x,0.)).x;
  float R = texture(u_pressure, v_uv + vec2(u_texel.x,0.)).x;
  float T = texture(u_pressure, v_uv + vec2(0.,u_texel.y)).x;
  float B = texture(u_pressure, v_uv - vec2(0.,u_texel.y)).x;
  float d = texture(u_div, v_uv).x;
  o = vec4((L+R+T+B - d) * 0.25, 0., 0., 1.);
}`;

const GRADSUB = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_pressure, u_vel; uniform vec2 u_texel; out vec4 o;
void main(){
  float L = texture(u_pressure, v_uv - vec2(u_texel.x,0.)).x;
  float R = texture(u_pressure, v_uv + vec2(u_texel.x,0.)).x;
  float T = texture(u_pressure, v_uv + vec2(0.,u_texel.y)).x;
  float B = texture(u_pressure, v_uv - vec2(0.,u_texel.y)).x;
  vec2 v = texture(u_vel, v_uv).xy - vec2(R-L, T-B) * 0.5;
  o = vec4(v, 0., 1.);
}`;

const SPLAT = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_target; uniform vec2 u_point;
uniform vec3 u_color; uniform float u_radius, u_aspect; out vec4 o;
void main(){
  vec2 p = v_uv - u_point; p.x *= u_aspect;
  float s = exp(-dot(p,p) / u_radius);
  o = vec4(texture(u_target, v_uv).xyz + s * u_color, 1.);
}`;

const NAME = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_target, u_mask; uniform vec3 u_color;
uniform float u_amt; uniform vec2 u_maskScale, u_center; out vec4 o;
void main(){
  vec2 muv = (v_uv - u_center) * u_maskScale + 0.5;
  float m = (muv.x>0.&&muv.x<1.&&muv.y>0.&&muv.y<1.) ? texture(u_mask, muv).a : 0.;
  o = vec4(texture(u_target, v_uv).xyz + m * u_color * u_amt, 1.);
}`;

const DISPLAY = `#version 300 es
precision highp float;
in vec2 v_uv; uniform sampler2D u_dye; out vec4 o;
void main(){
  vec3 c = texture(u_dye, v_uv).rgb;
  c = c / (1.0 + c);
  c = pow(c, vec3(0.85));
  o = vec4(c, 1.0);
}`;

const PALETTE = [
  [0.18, 0.9, 0.85],
  [0.3, 0.45, 1.0],
  [1.0, 0.35, 0.6],
  [0.95, 0.7, 0.2],
  [0.6, 0.3, 1.0],
];

export type FluidState = { line1: string; line2?: string };

export type FluidOptions = {
  nameLine1?: string;
  nameLine2?: string;
  nameColor?: [number, number, number];
  nameAmt?: number;
  /** Words to morph between. Overrides nameLine1/2 when provided. */
  states?: FluidState[];
  /** Canvas font-family for the dye text (e.g. a resolved next/font family). */
  fontFamily?: string;
  /** Where the name sits, normalized (x right, y up). Default center [0.5,0.5]. */
  namePos?: [number, number];
  /** Build the dye-mask canvas yourself (overrides states/text rendering). */
  maskBuilder?: () => HTMLCanvasElement;
  /** Overall liveliness 0..1. Lower = much calmer when idle. Default 1. */
  energy?: number;
  /** Pointer stir strength. Default 6500. */
  pointerForce?: number;
};

/** A continuous "smoke" source — e.g. behind a button — in fluid space. */
export type Emitter = { x: number; y: number; color: number[] };

export type FluidApi = {
  splat: (xNorm: number, yNorm: number, color?: number[]) => void;
  /** Advance to the next state with an organic "explode → reform" morph. */
  cycle: () => void;
  /** Jump to a specific state index. */
  setState: (i: number) => void;
  /** Replace the set of continuous smoke emitters. */
  setEmitters: (list: Emitter[]) => void;
  /** Rebuild the dye mask (e.g. after a web font finishes loading). */
  refresh: () => void;
};

export function useFluid(
  ref: RefObject<HTMLCanvasElement | null>,
  opts: FluidOptions = {}
) {
  const [supported, setSupported] = useState(true);
  const api = useRef<FluidApi>({
    splat: () => {},
    cycle: () => {},
    setState: () => {},
    setEmitters: () => {},
    refresh: () => {},
  });

  useEffect(() => {
    const canvas = ref.current!;
    const gl = getGL(canvas);
    if (!gl) {
      setSupported(false);
      return;
    }
    enableFloat(gl);
    const R = makeRenderer(gl);

    const mobile = window.innerWidth < 768;
    const SIM = mobile ? 140 : 220;
    const DYE = mobile ? 360 : 620;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const nameColor = opts.nameColor ?? [0.25, 1.0, 0.9];
    const nameAmt = opts.nameAmt ?? 0.16;
    const family = opts.fontFamily ?? "system-ui, sans-serif";
    const namePos: [number, number] = opts.namePos ?? [0.5, 0.5];
    const energy = Math.max(0.05, opts.energy ?? 1);
    const pointerForce = opts.pointerForce ?? 6500;
    let emitters: { x: number; y: number; color: number[]; seed: number }[] = [];
    const states: FluidState[] =
      opts.states ?? [
        { line1: opts.nameLine1 ?? "KENTA", line2: opts.nameLine2 ?? "YAMAMOTO" },
      ];

    function makeMask(s: FluidState) {
      const c = opts.maskBuilder
        ? opts.maskBuilder()
        : textCanvas(s.line1, s.line2, { fontFamily: family });
      return canvasTexture(gl!, c);
    }

    let stateIdx = 0;
    let maskTex = makeMask(states[0]);
    let injectBoost = 0; // temporary extra injection so a new word forms fast

    // rebuild once web fonts are guaranteed ready (canvas needs loaded fonts)
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        const t = makeMask(states[stateIdx]);
        gl!.deleteTexture(maskTex);
        maskTex = t;
      });
    }

    const dF = (s: number, aspect: number): [number, number] =>
      aspect >= 1 ? [Math.round(s * aspect), s] : [s, Math.round(s / aspect)];

    let aspect = 1;
    let vel: DoubleFBO, dye: DoubleFBO, prs: DoubleFBO, div: DoubleFBO, curl: DoubleFBO;
    let simTexel: [number, number] = [1, 1];

    function alloc() {
      aspect = window.innerWidth / window.innerHeight;
      const [sw, sh] = dF(SIM, aspect);
      const [dw, dh] = dF(DYE, aspect);
      simTexel = [1 / sw, 1 / sh];
      const RG = gl!.RGBA16F,
        F = gl!.RGBA,
        H = gl!.HALF_FLOAT,
        LIN = gl!.LINEAR;
      vel = createDoubleFBO(gl!, sw, sh, RG, F, H, LIN);
      dye = createDoubleFBO(gl!, dw, dh, RG, F, H, LIN);
      prs = createDoubleFBO(gl!, sw, sh, RG, F, H, gl!.NEAREST);
      div = createDoubleFBO(gl!, sw, sh, RG, F, H, gl!.NEAREST);
      curl = createDoubleFBO(gl!, sw, sh, RG, F, H, gl!.NEAREST);
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

    const advect = createPass(gl, ADVECT);
    const divergence = createPass(gl, DIVERGENCE);
    const curlP = createPass(gl, CURL);
    const vorticity = createPass(gl, VORTICITY);
    const pressure = createPass(gl, PRESSURE);
    const gradsub = createPass(gl, GRADSUB);
    const splat = createPass(gl, SPLAT);
    const name = createPass(gl, NAME);
    const display = createPass(gl, DISPLAY);

    const ptr = { x: 0.5, y: 0.5, dx: 0, dy: 0, down: false, moved: false };
    function onMove(e: PointerEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      ptr.dx = x - ptr.x;
      ptr.dy = y - ptr.y;
      ptr.x = x;
      ptr.y = y;
      ptr.moved = true;
    }
    const onDown = (e: PointerEvent) => {
      ptr.down = true;
      onMove(e);
      ptr.dx = ptr.dy = 0;
    };
    const onUp = () => (ptr.down = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    function splatVel(px: number, py: number, dx: number, dy: number, radius: number) {
      splat.use({
        target: { tex: vel.read.tex, unit: 0 },
        point: [px, py],
        color: [dx, dy, 0],
        radius,
        aspect,
      });
      R.blit(vel.write);
      vel.swap();
    }
    function splatDye(px: number, py: number, col: number[], radius: number) {
      splat.use({
        target: { tex: dye.read.tex, unit: 0 },
        point: [px, py],
        color: col,
        radius,
        aspect,
      });
      R.blit(dye.write);
      dye.swap();
    }
    function doSplat(px: number, py: number, dx: number, dy: number, col: number[]) {
      const radius = mobile ? 0.0014 : 0.0009;
      splatVel(px, py, dx, dy, radius);
      splatDye(px, py, col, radius);
    }

    // a radial velocity burst that blows the current word apart
    function burst() {
      const N = 10;
      const power = mobile ? 5200 : 6500;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * 6.2831853;
        const px = 0.5 + Math.cos(a) * 0.12;
        const py = 0.5 + Math.sin(a) * 0.12;
        splatVel(px, py, Math.cos(a) * power, Math.sin(a) * power, mobile ? 0.002 : 0.0014);
      }
    }

    // imperative API for overlay UI
    api.current.splat = (xNorm, yNorm, color) => {
      const ang = xNorm * 6.28 + yNorm * 3.14;
      doSplat(
        xNorm,
        yNorm,
        Math.cos(ang) * 2400,
        Math.sin(ang) * 2400,
        color ?? PALETTE[Math.floor(xNorm * PALETTE.length) % PALETTE.length]
      );
    };
    api.current.setState = (i) => {
      stateIdx = ((i % states.length) + states.length) % states.length;
      const t = makeMask(states[stateIdx]);
      gl!.deleteTexture(maskTex);
      maskTex = t;
      injectBoost = 0.5;
      burst();
    };
    api.current.cycle = () => api.current.setState(stateIdx + 1);
    api.current.setEmitters = (list) => {
      emitters = list.map((e, i) => ({ x: e.x, y: e.y, color: e.color, seed: i * 2.3 + 0.7 }));
    };
    api.current.refresh = () => {
      const t = makeMask(states[stateIdx]);
      gl!.deleteTexture(maskTex);
      maskTex = t;
    };

    let autoT = 0;
    let ci = 0;
    let raf = 0;
    let prev = performance.now();
    const start = prev;

    function frame(now: number) {
      const g = gl!;
      let dt = (now - prev) / 1000;
      prev = now;
      dt = Math.min(dt, 0.0166);
      const elapsed = (now - start) / 1000;
      g.disable(g.BLEND);
      g.bindVertexArray(R.quad);

      if (ptr.moved) {
        const mag = Math.hypot(ptr.dx, ptr.dy);
        if (mag > 0.0002) {
          const f = pointerForce * (mobile ? 0.85 : 1); // pointer stays lively regardless of energy
          doSplat(
            ptr.x,
            ptr.y,
            ptr.dx * f,
            ptr.dy * f,
            PALETTE[ci % PALETTE.length].map((v) => v * 0.6)
          );
        }
        ptr.moved = false;
        ptr.dx = 0;
        ptr.dy = 0;
      }

      // ambient drift — rarer and gentler the calmer `energy` is
      autoT -= dt;
      if (autoT <= 0) {
        autoT = (mobile ? 2.0 : 1.6) / energy + (elapsed % 0.7);
        const ang = elapsed * 1.7;
        const px = 0.5 + Math.cos(ang) * 0.28;
        const py = 0.5 + Math.sin(ang * 1.3) * 0.28;
        const p = 2600 * energy;
        doSplat(
          px,
          py,
          Math.cos(ang) * p,
          Math.sin(ang) * p,
          PALETTE[ci % PALETTE.length].map((v) => v * (0.35 + 0.45 * energy))
        );
        ci++;
      }

      // soft, in-place "モワモワ" behind the buttons. Velocity is ZERO-MEAN in
      // both axes (no net direction) so it churns where it sits instead of
      // drifting upward like wind/smoke.
      for (const e of emitters) {
        const r = mobile ? 0.0019 : 0.0013; // tighter, more localized cloud
        const sx = Math.sin(elapsed * 1.1 + e.seed) * 0.6 + Math.sin(elapsed * 2.3 + e.seed * 1.7) * 0.4;
        const sy = Math.cos(elapsed * 0.9 + e.seed * 1.3) * 0.6 + Math.cos(elapsed * 2.0 + e.seed) * 0.4;
        const wob = 80; // gentle churn, very little spread
        splatVel(e.x, e.y, sx * wob, sy * wob, r);
        splatDye(e.x, e.y, e.color, r);
      }

      curlP.use({ vel: { tex: vel.read.tex, unit: 0 }, texel: simTexel });
      R.blit(curl.write);
      curl.swap();
      vorticity.use({
        vel: { tex: vel.read.tex, unit: 0 },
        curl: { tex: curl.read.tex, unit: 1 },
        texel: simTexel,
        curlAmt: 26 * (0.25 + 0.75 * energy),
        dt,
      });
      R.blit(vel.write);
      vel.swap();

      divergence.use({ vel: { tex: vel.read.tex, unit: 0 }, texel: simTexel });
      R.blit(div.write);
      div.swap();
      for (let i = 0; i < (mobile ? 18 : 26); i++) {
        pressure.use({
          pressure: { tex: prs.read.tex, unit: 0 },
          div: { tex: div.read.tex, unit: 1 },
          texel: simTexel,
        });
        R.blit(prs.write);
        prs.swap();
      }
      gradsub.use({
        pressure: { tex: prs.read.tex, unit: 0 },
        vel: { tex: vel.read.tex, unit: 1 },
        texel: simTexel,
      });
      R.blit(vel.write);
      vel.swap();

      advect.use({
        vel: { tex: vel.read.tex, unit: 0 },
        src: { tex: vel.read.tex, unit: 0 },
        texel: simTexel,
        dt,
        diss: 0.985 + 0.01 * energy,
      });
      R.blit(vel.write);
      vel.swap();
      advect.use({
        vel: { tex: vel.read.tex, unit: 0 },
        src: { tex: dye.read.tex, unit: 1 },
        texel: simTexel,
        dt,
        diss: 0.975,
      });
      R.blit(dye.write);
      dye.swap();

      const maskScale: [number, number] = aspect >= 2 ? [aspect / 2, 1] : [1, 2 / aspect];
      name.use({
        target: { tex: dye.read.tex, unit: 0 },
        mask: { tex: maskTex, unit: 1 },
        color: nameColor,
        amt: nameAmt + injectBoost,
        maskScale,
        center: namePos,
      });
      R.blit(dye.write);
      dye.swap();
      injectBoost *= 0.94; // decay the post-switch boost back to baseline

      display.use({ dye: { tex: dye.read.tex, unit: 0 } });
      R.blit(null);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { supported, api };
}
