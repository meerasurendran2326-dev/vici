"use client"

import { ShaderBackground } from "@/components/ui/adisyon-shader"

export function ShaderBackgroundDemo() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <ShaderBackground className="h-full w-full" />
    </div>
  )
}

export default ShaderBackgroundDemo
