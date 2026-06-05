// Minimal WebGL2 helpers for the fluid portfolio.
// Kept tiny and dependency-free on purpose.

export type GL = WebGL2RenderingContext;

export function getGL(canvas: HTMLCanvasElement): GL | null {
  const gl = canvas.getContext("webgl2", {
    antialias: false,
    alpha: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
  });
  return gl;
}

export function compile(gl: GL, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error("shader compile error: " + log + "\n" + withLines(src));
  }
  return sh;
}

export function program(gl: GL, vert: string, frag: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error("program link error: " + gl.getProgramInfoLog(p));
  }
  return p;
}

function withLines(src: string) {
  return src
    .split("\n")
    .map((l, i) => `${String(i + 1).padStart(3, " ")}| ${l}`)
    .join("\n");
}

// Fullscreen-quad vertex shader (passes a 0..1 uv). Reused everywhere.
export const QUAD_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

export function makeQuad(gl: GL): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // two triangles covering clip space
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]), // single big triangle
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}

export type FBO = {
  fb: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
};

export function createFBO(
  gl: GL,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fb, tex, w, h };
}

export type DoubleFBO = {
  read: FBO;
  write: FBO;
  swap: () => void;
};

export function createDoubleFBO(
  gl: GL,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
): DoubleFBO {
  let a = createFBO(gl, w, h, internalFormat, format, type, filter);
  let b = createFBO(gl, w, h, internalFormat, format, type, filter);
  return {
    get read() {
      return a;
    },
    get write() {
      return b;
    },
    swap() {
      const t = a;
      a = b;
      b = t;
    },
  } as DoubleFBO;
}

// Enable float/half-float render targets. Returns the texture `type` to use
// (HALF_FLOAT preferred for mobile compatibility).
export function enableFloat(gl: GL): number {
  gl.getExtension("EXT_color_buffer_float");
  gl.getExtension("EXT_color_buffer_half_float");
  gl.getExtension("OES_texture_float_linear");
  return gl.HALF_FLOAT;
}

// --- higher-level helpers used by the single-pass / ping-pong demos ------

export type Tex = { tex: WebGLTexture; unit: number };
export type UniformVal = number | number[] | Tex | boolean;

function isTex(v: UniformVal): v is Tex {
  return typeof v === "object" && v !== null && "tex" in v;
}

export type Pass = {
  prog: WebGLProgram;
  use: (uniforms?: Record<string, UniformVal>) => void;
};

// A fragment-shader pass over a fullscreen triangle, with a tiny typed
// uniform setter (numbers, vec2/3/4 arrays, and {tex,unit} samplers).
export function createPass(gl: GL, frag: string, vert: string = QUAD_VERT): Pass {
  const prog = program(gl, vert, frag);
  const loc = new Map<string, WebGLUniformLocation | null>();
  const L = (n: string) => {
    if (!loc.has(n)) loc.set(n, gl.getUniformLocation(prog, n));
    return loc.get(n)!;
  };
  return {
    prog,
    use(uniforms) {
      gl.useProgram(prog);
      if (!uniforms) return;
      for (const k in uniforms) {
        const v = uniforms[k];
        const l = L("u_" + k);
        if (l === null) continue;
        if (isTex(v)) {
          gl.activeTexture(gl.TEXTURE0 + v.unit);
          gl.bindTexture(gl.TEXTURE_2D, v.tex);
          gl.uniform1i(l, v.unit);
        } else if (typeof v === "number") {
          gl.uniform1f(l, v);
        } else if (typeof v === "boolean") {
          gl.uniform1f(l, v ? 1 : 0);
        } else if (v.length === 2) {
          gl.uniform2f(l, v[0], v[1]);
        } else if (v.length === 3) {
          gl.uniform3f(l, v[0], v[1], v[2]);
        } else if (v.length === 4) {
          gl.uniform4f(l, v[0], v[1], v[2], v[3]);
        }
      }
    },
  };
}

export type Renderer = {
  quad: WebGLVertexArrayObject;
  blit: (target: FBO | null) => void;
};

export function makeRenderer(gl: GL): Renderer {
  const quad = makeQuad(gl);
  return {
    quad,
    blit(target) {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
        gl.viewport(0, 0, target.w, target.h);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
      gl.bindVertexArray(quad);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

// Rasterize text and return sampled opaque-pixel positions in clip space
// ([-1,1], y up). Used as morph/seed targets by several demos.
export function textPoints(
  text: string,
  count: number,
  opts?: { font?: string; aspect?: number }
): { positions: Float32Array; mask: HTMLCanvasElement } {
  const W = 1024;
  const H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // shrink font until it fits horizontally
  let size = 240;
  do {
    ctx.font = `700 ${size}px ${opts?.font ?? "system-ui, sans-serif"}`;
    size -= 6;
  } while (ctx.measureText(text).width > W * 0.9 && size > 20);
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const opaque: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4] > 128) opaque.push(x, y);
    }
  }
  const positions = new Float32Array(count * 2);
  const n = opaque.length / 2;
  for (let i = 0; i < count; i++) {
    const j = n > 0 ? (Math.floor((i / count) * n) % n) * 2 : 0;
    // jitter within the 2px cell so it doesn't look like a grid
    const px = opaque[j] + (i % 2);
    const py = opaque[j + 1] + ((i >> 1) % 2);
    positions[i * 2] = (px / W) * 2 - 1; // [-1,1]
    positions[i * 2 + 1] = -((py / H) * 2 - 1); // y up
  }
  return { positions, mask: c };
}

// Upload a 2D canvas as a sampleable texture (LINEAR, clamped).
export function canvasTexture(gl: GL, canvas: HTMLCanvasElement): WebGLTexture {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  return tex;
}

// Render two lines of text centered on a transparent canvas → returns canvas.
export function textCanvas(
  line1: string,
  line2?: string,
  opts?: { w?: number; h?: number; fontFamily?: string; weight1?: number; weight2?: number }
): HTMLCanvasElement {
  const W = opts?.w ?? 1024;
  const H = opts?.h ?? 512;
  const family = opts?.fontFamily ?? "system-ui, sans-serif";
  const w1 = opts?.weight1 ?? 800;
  const w2 = opts?.weight2 ?? 500;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = 220;
  do {
    ctx.font = `${w1} ${size}px ${family}`;
    size -= 6;
  } while (ctx.measureText(line1).width > W * 0.86 && size > 20);
  if (line2) {
    ctx.fillText(line1, W / 2, H * 0.4);
    ctx.font = `${w2} ${Math.round(size * 0.42)}px ${family}`;
    ctx.fillText(line2, W / 2, H * 0.66);
  } else {
    ctx.fillText(line1, W / 2, H / 2);
  }
  return c;
}

// Resolve a CSS custom property (e.g. next/font's --font-dm-sans) into a
// concrete font-family string that canvas's ctx.font can use.
export function cssFontFamily(cssVar: string, fallback = "system-ui, sans-serif"): string {
  if (typeof document === "undefined") return fallback;
  const el = document.createElement("span");
  el.style.cssText = `position:absolute;visibility:hidden;font-family:var(${cssVar})`;
  document.body.appendChild(el);
  const fam = getComputedStyle(el).fontFamily;
  document.body.removeChild(el);
  return fam || fallback;
}

// Rasterize an SVG string (or data/URL) into a canvas mask, resolving once the
// image has loaded. The SVG's painted (opaque) pixels become the dye source.
export function svgToCanvas(
  src: string,
  w = 1024,
  h = 512
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // contain the svg centered
      const s = Math.min(w / img.width, h / img.height) * 0.9;
      const dw = img.width * s;
      const dh = img.height * s;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      resolve(c);
    };
    img.onerror = reject;
    img.src = src.trim().startsWith("<")
      ? "data:image/svg+xml;utf8," + encodeURIComponent(src)
      : src;
  });
}
