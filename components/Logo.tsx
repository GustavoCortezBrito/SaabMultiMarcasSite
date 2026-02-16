import Image from "next/image";

export default function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { width: 120, height: 40 },
    md: { width: 200, height: 67 },
    lg: { width: 300, height: 100 }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/saab-logo.png"
        alt="SAAB Multimarcas"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain"
        priority
      />
    </div>
  );
}
