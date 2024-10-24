import Image from 'next/image'

export function Logo() {
  return (
    <div className="w-8 h-8">
      <Image
        src="/LOGOLAUDA.svg"
        alt="Laudos.ai"
        width={32}
        height={32}
        priority
      />
    </div>
  )
}
