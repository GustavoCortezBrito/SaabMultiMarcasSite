export default function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { car: 40, text: "text-lg", subtext: "text-xs" },
    md: { car: 60, text: "text-2xl md:text-3xl", subtext: "text-sm md:text-base" },
    lg: { car: 100, text: "text-5xl md:text-7xl", subtext: "text-2xl md:text-3xl" }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Car Icon */}
      <svg
        width={currentSize.car}
        height={currentSize.car * 0.5}
        viewBox="0 0 200 100"
        className="mb-1"
      >
        <path
          d="M40 70 L60 50 L100 50 L120 70 L180 70 L180 85 L40 85 Z M64 54 L70 64 L96 64 L104 54 Z"
          fill="#D4A853"
          stroke="#D4A853"
          strokeWidth="3"
        />
        <circle cx="70" cy="85" r="12" fill="#D4A853" stroke="#0F5FA8" strokeWidth="3" />
        <circle cx="150" cy="85" r="12" fill="#D4A853" stroke="#0F5FA8" strokeWidth="3" />
      </svg>

      {/* Text */}
      <div className="flex flex-col items-center -mt-1">
        <span className={`${currentSize.text} font-bold text-[#D4A853] tracking-wider`}>
          SAAB
        </span>
        <span className={`${currentSize.subtext} font-semibold text-[#D4A853] -mt-1 tracking-wide`}>
          MULTIMARCAS
        </span>
      </div>
    </div>
  );
}
