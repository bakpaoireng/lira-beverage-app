interface BottleProps {
  colors: {
    cap: string;
    liquidTop: string;
    liquidBottom: string;
    label: string;
    leaf: string;
  };
  className?: string;
}

/** Lira brand bottle — glass bottle, cream cap, circular label with leaf. */
export function Bottle({ colors, className }: BottleProps) {
  const uid = `b-${colors.cap.replace(/[^a-z0-9]/gi, "")}${colors.liquidBottom.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      role="img"
      aria-label="Lira drink bottle"
    >
      <defs>
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.liquidTop} />
          <stop offset="100%" stopColor={colors.liquidBottom} />
        </linearGradient>
      </defs>

      {/* cap */}
      <rect x="44" y="8" width="32" height="22" rx="5" fill={colors.cap} />
      <rect
        x="44"
        y="8"
        width="32"
        height="22"
        rx="5"
        fill="black"
        opacity="0.06"
      />
      {/* cap ridges */}
      {[52, 58, 64, 70].map((x) => (
        <line
          key={x}
          x1={x}
          y1="10"
          x2={x}
          y2="28"
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="1.4"
        />
      ))}

      {/* neck */}
      <path
        d="M48 30 h24 v14 c0 6 3 9 7 12 v6 H41 v-6 c4 -3 7 -6 7 -12 z"
        fill="white"
        opacity="0.55"
      />

      {/* body */}
      <path
        d="M41 62 c-8 7 -12 14 -12 26 v128 c0 14 10 24 24 24 h14 c14 0 24 -10 24 -24 V88 c0 -12 -4 -19 -12 -26 z"
        fill={`url(#liq-${uid})`}
      />
      {/* glass sheen */}
      <path
        d="M36 70 c-4 5 -6 11 -6 18 v122 c0 10 5 18 12 21"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M84 70 c4 5 6 11 6 18 v122 c0 10 -5 18 -12 21"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* droplets */}
      <circle cx="70" cy="95" r="1.6" fill="white" opacity="0.5" />
      <circle cx="52" cy="120" r="1.3" fill="white" opacity="0.4" />
      <circle cx="76" cy="150" r="1.4" fill="white" opacity="0.45" />
      <circle cx="48" cy="185" r="1.5" fill="white" opacity="0.4" />

      {/* label */}
      <circle cx="60" cy="128" r="24" fill={colors.label} />
      <circle
        cx="60"
        cy="128"
        r="24"
        fill="none"
        stroke={colors.leaf}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* leaf on label */}
      <path
        d="M68 112 q8 -3 10 -12 q-9 0 -12 6 q-2 4 2 6 z"
        fill={colors.leaf}
        opacity="0.9"
      />
      {/* Lira script */}
      <text
        x="60"
        y="134"
        textAnchor="middle"
        fontSize="15"
        fontStyle="italic"
        fontWeight="600"
        fill={colors.leaf}
        style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
      >
        Lira
      </text>

      {/* flavor tag */}
      <rect
        x="34"
        y="158"
        width="52"
        height="14"
        rx="7"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}
