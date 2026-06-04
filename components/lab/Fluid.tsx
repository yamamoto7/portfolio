"use client";

import { useRef } from "react";
import { useFluid } from "@/lib/lab/useFluid";
import Chrome from "./Chrome";

export default function Fluid() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { supported } = useFluid(ref);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <Chrome
        title="02 · fluid"
        hint="本物の流体シミュレーション。ドラッグ／スワイプで渦をかき混ぜると、名前が流れの中で踊ります。"
      />
      {!supported && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}
