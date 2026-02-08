'use client';

import Image from 'next/image';

export function DarkModeSection() {
  return (
    <div className="space-y-8">
      {/* Side-by-side panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Light Mode Panel */}
        <div className="rounded-xl overflow-hidden border border-holo-charcoal/10">
          <div className="bg-holo-offwhite p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-holo-charcoal" />
              <span className="font-archivo-condensed font-semibold text-holo-charcoal text-sm uppercase tracking-wider">Light Mode</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-horizontal-positive.png"
                alt="Logo (light)"
                width={120}
                height={40}
                className="h-8 w-auto"
                unoptimized
              />
            </div>

            {/* Text samples */}
            <div className="space-y-2 mb-6">
              <p className="font-archivo-condensed font-semibold text-2xl text-holo-charcoal uppercase">The Journey Starts Now</p>
              <p className="font-archivo text-sm text-[rgba(45,41,38,0.6)]">Freedom is everywhere. We just give you the means.</p>
              <p className="font-archivo text-xs text-[rgba(45,41,38,0.4)]">Muted caption text</p>
            </div>

            {/* Mock button */}
            <button className="px-4 py-2 bg-holo-charcoal text-white font-archivo-condensed font-semibold text-sm uppercase tracking-wider">
              Book Now
            </button>

            {/* Card */}
            <div className="mt-4 p-4 bg-white border border-[rgba(45,41,38,0.1)] rounded-lg">
              <p className="font-archivo text-sm text-holo-charcoal">Elevated surface (card)</p>
            </div>
          </div>
        </div>

        {/* Dark Mode Panel */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <div className="bg-[#1A1817] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-holo-offwhite" />
              <span className="font-archivo-condensed font-semibold text-holo-offwhite text-sm uppercase tracking-wider">Dark Mode</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-horizontal-negative.png"
                alt="Logo (dark)"
                width={120}
                height={40}
                className="h-8 w-auto"
                unoptimized
              />
            </div>

            {/* Text samples */}
            <div className="space-y-2 mb-6">
              <p className="font-archivo-condensed font-semibold text-2xl text-holo-offwhite uppercase">The Journey Starts Now</p>
              <p className="font-archivo text-sm text-[rgba(250,250,250,0.7)]">Freedom is everywhere. We just give you the means.</p>
              <p className="font-archivo text-xs text-[rgba(250,250,250,0.4)]">Muted caption text</p>
            </div>

            {/* Mock button */}
            <button className="px-4 py-2 bg-holo-offwhite text-holo-charcoal font-archivo-condensed font-semibold text-sm uppercase tracking-wider">
              Book Now
            </button>

            {/* Card */}
            <div className="mt-4 p-4 bg-holo-charcoal border border-[rgba(250,250,250,0.1)] rounded-lg">
              <p className="font-archivo text-sm text-holo-offwhite">Elevated surface (card)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic on light vs dark */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Gradient on Light vs Dark</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-40 rounded-xl overflow-hidden bg-holo-offwhite">
            <div className="absolute inset-0 holographic-base" />
            <div className="absolute inset-0 holographic-overlay opacity-60" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <p className="font-archivo-condensed font-semibold text-2xl text-holo-charcoal uppercase">Light Base</p>
            </div>
          </div>
          <div className="relative h-40 rounded-xl overflow-hidden bg-[#1A1817]">
            <div className="absolute inset-0 holographic-base opacity-70" />
            <div className="absolute inset-0 holographic-overlay opacity-40" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <p className="font-archivo-condensed font-semibold text-2xl text-holo-offwhite uppercase">Dark Base</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
