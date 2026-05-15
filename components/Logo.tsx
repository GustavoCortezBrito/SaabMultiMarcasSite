export default function Logo({ className = "", size = "md", variant = "light" }: {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}) {
  const sizes = {
    sm: { width: 140, height: 44 },
    md: { width: 180, height: 56 },
    lg: { width: 260, height: 80 }
  };

  const currentSize = sizes[size];
  const goldColor = "#C5A059";
  const textColor = variant === "dark" ? "#0A192F" : "#FFFFFF";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 260 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SAAB Multimarcas"
      >
        {/* Car Icon */}
        <g transform="translate(0, 4)">
          {/* Car silhouette */}
          <path
            d="M15 46 C15 46 18 34 28 30 L50 26 C54 25 58 24 62 24 L78 24 C82 24 86 25 88 27 L100 30 C108 32 112 40 112 40 L116 42 C118 43 118 46 116 47 L15 47 C13 47 13 46 15 46Z"
            stroke={goldColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Windshield */}
          <path
            d="M52 30 L58 24 L78 24 L86 30"
            stroke={goldColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Wheels */}
          <circle cx="38" cy="47" r="7" stroke={goldColor} strokeWidth="2.5" fill="none" />
          <circle cx="38" cy="47" r="3" fill={goldColor} />
          <circle cx="93" cy="47" r="7" stroke={goldColor} strokeWidth="2.5" fill="none" />
          <circle cx="93" cy="47" r="3" fill={goldColor} />
          {/* Door line */}
          <line x1="66" y1="24" x2="66" y2="43" stroke={goldColor} strokeWidth="1.5" opacity="0.7" />
          {/* Headlight */}
          <path d="M108 36 L116 38 L116 42 L108 42" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Rear */}
          <path d="M18 40 L15 42 L15 46" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Divider line */}
        <line x1="130" y1="8" x2="130" y2="72" stroke={goldColor} strokeWidth="1" opacity="0.3" />

        {/* Brand Name - SAAB */}
        <text
          x="148"
          y="38"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontWeight="900"
          fontSize="22"
          fill={textColor}
          letterSpacing="3"
        >
          SAAB
        </text>

        {/* Subtitle - MULTIMARCAS */}
        <text
          x="149"
          y="55"
          fontFamily="'Arial', sans-serif"
          fontWeight="400"
          fontSize="9"
          fill={goldColor}
          letterSpacing="4"
        >
          MULTIMARCAS
        </text>

        {/* Gold accent line under SAAB */}
        <line x1="148" y1="42" x2="256" y2="42" stroke={goldColor} strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
