import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Image
            src="/images/chameleon-color.png"
            alt=""
            width={48}
            height={48}
            className="opacity-70"
            priority
          />
        </div>
        <div className="h-[2px] w-16 rounded-full holographic-base" />
      </div>
    </div>
  );
}
