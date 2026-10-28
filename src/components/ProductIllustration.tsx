import React from 'react';

interface ProductIllustrationProps {
  type:
    | 'diffuser'
    | 'roller'
    | 'storage-box'
    | 'glass-jars'
    | 'bamboo-caddy'
    | 'hair-turban'
    | 'cosmetic-stand'
    | 'linen-apron';
  className?: string;
  badge?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  type,
  className = 'w-full h-full',
  badge,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE5] select-none ${className}`}
    >
      {/* Background warm aesthetic ambient rings */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#E8D4C8] blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#F3E3D6] blur-2xl" />
      </div>

      {/* Product Artwork based on type */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-105">
        {type === 'diffuser' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(193,106,70,0.18)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Diffuser soft mist plume */}
            <path
              d="M120 40 C116 28, 126 18, 120 8 C114 18, 124 28, 120 40"
              stroke="#C16A46"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            <path
              d="M125 45 C122 34, 130 24, 126 14"
              stroke="#D88A68"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            {/* Diffuser Upper Dome */}
            <path
              d="M120 45 C146 45, 168 85, 172 135 C173 146, 166 155, 154 155 L86 155 C74 155, 67 146, 68 135 C72 85, 94 45, 120 45 Z"
              fill="url(#terracottaGrad)"
            />
            {/* Diffuser Subtle Light Band */}
            <rect x="74" y="153" width="92" height="4" rx="2" fill="#FFEFE6" fillOpacity="0.85" />
            {/* Diffuser Wooden / Matte Base */}
            <path
              d="M74 157 L166 157 C168 157, 170 159, 169 161 L164 175 C163 177, 161 178, 159 178 L81 178 C79 178, 77 177, 76 175 L71 161 C70 159, 72 157, 74 157 Z"
              fill="#8A462B"
            />
            {/* Subtle Texture lines */}
            <path
              d="M96 90 Q120 96 144 90"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            <path
              d="M88 120 Q120 128 152 120"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="terracottaGrad" x1="68" y1="45" x2="172" y2="155" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D97F5B" />
                <stop offset="0.55" stopColor="#C16A46" />
                <stop offset="1" stopColor="#A44E2C" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'glass-jars' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(112,107,102,0.14)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow beneath */}
            <ellipse cx="120" cy="190" rx="70" ry="12" fill="#E4D7CC" fillOpacity="0.6" />
            {/* Center Jar Glass */}
            <rect x="88" y="75" width="64" height="105" rx="10" fill="#FFFFFF" fillOpacity="0.65" stroke="#D1C4B8" strokeWidth="2" />
            {/* Bamboo Lid */}
            <rect x="84" y="62" width="72" height="15" rx="4" fill="#C69E72" />
            <line x1="84" y1="67" x2="156" y2="67" stroke="#AF8457" strokeWidth="1" />
            {/* Silicone ring */}
            <rect x="92" y="74" width="56" height="3" fill="#E8DED6" />
            {/* Contents: Golden Spices / Dried Herbs */}
            <path d="M90 120 Q120 124 150 120 L150 172 Q120 178 90 172 Z" fill="#DFA261" fillOpacity="0.55" />
            {/* Label */}
            <rect x="99" y="102" width="42" height="24" rx="2" fill="#FAF7F2" stroke="#E2D6CA" strokeWidth="1" />
            <line x1="105" y1="110" x2="135" y2="110" stroke="#C16A46" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="110" y1="117" x2="130" y2="117" stroke="#A89E96" strokeWidth="1" strokeLinecap="round" />
            {/* Glass reflection shine */}
            <path d="M94 82 L94 165" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
          </svg>
        )}

        {type === 'storage-box' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(193,106,70,0.14)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Folded Catchall Linen Tray Perspective */}
            <polygon points="40,95 120,60 200,95 120,135" fill="#E8DDD2" stroke="#D3C3B4" strokeWidth="2" />
            <polygon points="40,95 120,135 120,175 40,135" fill="#C67653" />
            <polygon points="120,135 200,95 200,135 120,175" fill="#AC5834" />
            {/* Interior Linen Fabric Pattern */}
            <polygon points="50,98 120,68 190,98 120,130" fill="#FAF5EF" />
            {/* Corner Brass Snaps */}
            <circle cx="50" cy="98" r="4.5" fill="#D4AF37" stroke="#A5831C" strokeWidth="1" />
            <circle cx="120" cy="68" r="4.5" fill="#D4AF37" stroke="#A5831C" strokeWidth="1" />
            <circle cx="190" cy="98" r="4.5" fill="#D4AF37" stroke="#A5831C" strokeWidth="1" />
            <circle cx="120" cy="130" r="4.5" fill="#D4AF37" stroke="#A5831C" strokeWidth="1" />
            {/* Inside luxury items: gold ring & key */}
            <ellipse cx="115" cy="98" rx="10" ry="6" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <path d="M126 100 L142 110" stroke="#9A8878" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        {type === 'bamboo-caddy' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(112,107,102,0.14)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bamboo Frame */}
            <rect x="45" y="110" width="150" height="70" rx="8" fill="#C99C6A" stroke="#B08351" strokeWidth="2" />
            {/* Bamboo Carry Handle */}
            <path d="M60 110 L60 65 Q120 50 180 65 L180 110" stroke="#A77A4B" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Ceramic Cups Inserted */}
            <rect x="58" y="90" width="36" height="65" rx="4" fill="#FAF6F0" stroke="#DCD3CA" strokeWidth="1.5" />
            <rect x="102" y="90" width="36" height="65" rx="4" fill="#FAF6F0" stroke="#DCD3CA" strokeWidth="1.5" />
            <rect x="146" y="90" width="36" height="65" rx="4" fill="#FAF6F0" stroke="#DCD3CA" strokeWidth="1.5" />
            {/* Utensil tops peeking out */}
            <line x1="72" y1="90" x2="68" y2="60" stroke="#A69E96" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="78" y1="90" x2="82" y2="55" stroke="#C16A46" strokeWidth="2" strokeLinecap="round" />
            <line x1="120" y1="90" x2="120" y2="52" stroke="#8A462B" strokeWidth="3" strokeLinecap="round" />
            <line x1="162" y1="90" x2="166" y2="58" stroke="#A69E96" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}

        {type === 'roller' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(224,137,102,0.22)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Rose Quartz Gua Sha Stone (Behind) */}
            <path
              d="M60 140 C45 110, 70 85, 95 95 C120 105, 125 140, 105 165 C85 185, 65 170, 60 140 Z"
              fill="url(#roseQuartzGrad2)"
              opacity="0.85"
            />
            {/* Rose Quartz Main Roller (Front diagonal) */}
            <g transform="rotate(35 120 120)">
              {/* Handle */}
              <rect x="114" y="80" width="12" height="75" rx="6" fill="url(#roseQuartzGrad)" stroke="#E0B6B0" strokeWidth="1" />
              {/* Metallic Frame Gold */}
              <path d="M102 75 L138 75 L138 52 C138 50, 102 50, 102 52 Z" fill="#D9A86E" />
              {/* Large Top Quartz Stone */}
              <rect x="94" y="44" width="52" height="22" rx="11" fill="url(#roseQuartzGrad)" stroke="#E8C3BD" strokeWidth="1.5" />
              {/* Lower Small Quartz Stone */}
              <rect x="105" y="162" width="30" height="16" rx="8" fill="url(#roseQuartzGrad)" stroke="#E8C3BD" strokeWidth="1.5" />
              <path d="M112 155 L128 155 L128 162 L112 162 Z" fill="#D9A86E" />
            </g>
            <defs>
              <linearGradient id="roseQuartzGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#F9DFDE" />
                <stop offset="0.5" stopColor="#F3C3C0" />
                <stop offset="1" stopColor="#E5A6A2" />
              </linearGradient>
              <linearGradient id="roseQuartzGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FDEEEC" />
                <stop offset="1" stopColor="#F0BCB8" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'hair-turban' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(193,106,70,0.12)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Waffle Microfiber Turban Swirl Form */}
            <path
              d="M70 145 C60 115, 80 80, 115 70 C155 60, 185 85, 175 125 C168 150, 140 170, 105 168 C85 166, 75 158, 70 145 Z"
              fill="#F6EDE7"
              stroke="#DEC9BE"
              strokeWidth="2"
            />
            {/* Fold & Tail Wrap */}
            <path
              d="M115 70 C140 75, 160 95, 155 130 C150 155, 125 170, 95 165"
              stroke="#D1B9AD"
              strokeWidth="2"
              fill="none"
            />
            {/* Coconut Shell Button */}
            <circle cx="125" cy="155" r="7" fill="#6A4533" stroke="#4D2E20" strokeWidth="1" />
            <circle cx="123" cy="154" r="1.2" fill="#E8D7CE" />
            <circle cx="127" cy="156" r="1.2" fill="#E8D7CE" />
            {/* Elastic Loop */}
            <path d="M125 148 C125 140, 130 140, 130 148" stroke="#DEC9BE" strokeWidth="2" fill="none" />
            {/* Waffle Micro-texture lines */}
            <path d="M85 110 Q105 118 125 110" stroke="#E6D3C8" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M88 125 Q115 135 140 125" stroke="#E6D3C8" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M95 140 Q118 148 145 138" stroke="#E6D3C8" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        )}

        {type === 'cosmetic-stand' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(112,107,102,0.16)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base Rotating Plate */}
            <ellipse cx="120" cy="180" rx="65" ry="16" fill="#F8F3ED" stroke="#D3B89D" strokeWidth="2" />
            {/* Gold Vertical Columns */}
            <line x1="75" y1="180" x2="75" y2="105" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
            <line x1="165" y1="180" x2="165" y2="105" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
            {/* Top Tier Rotating Plate */}
            <ellipse cx="120" cy="105" rx="55" ry="14" fill="#FAF6F1" stroke="#D3B89D" strokeWidth="2" />
            {/* Cosmetic Bottles Resting on Top Tier */}
            <rect x="105" y="65" width="16" height="34" rx="4" fill="#C16A46" fillOpacity="0.8" />
            <rect x="110" y="55" width="6" height="10" fill="#3D3734" />
            {/* Glass Dropper Bottle on Bottom Tier */}
            <rect x="120" y="132" width="22" height="42" rx="4" fill="#E8C3BD" fillOpacity="0.75" stroke="#D9A8A0" strokeWidth="1" />
            <circle cx="131" cy="126" r="5" fill="#FAF6F1" stroke="#D4AF37" strokeWidth="1" />
            <line x1="131" y1="126" x2="131" y2="132" stroke="#FAF6F1" strokeWidth="2" />
          </svg>
        )}

        {type === 'linen-apron' && (
          <svg
            viewBox="0 0 240 240"
            className="w-44 h-44 drop-shadow-[0_12px_24px_rgba(193,106,70,0.14)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Japanese Cross-back Pinafore Silhouette */}
            <path
              d="M80 50 L95 100 L75 190 C95 194, 145 194, 165 190 L145 100 L160 50 L140 50 L130 90 L110 90 L100 50 Z"
              fill="#D48B6E"
            />
            {/* Chest Center Stitch */}
            <line x1="120" y1="90" x2="120" y2="192" stroke="#BA7154" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* Pockets */}
            <rect x="85" y="130" width="28" height="32" rx="3" fill="#C16A46" stroke="#AA5A38" strokeWidth="1" />
            <rect x="127" y="130" width="28" height="32" rx="3" fill="#C16A46" stroke="#AA5A38" strokeWidth="1" />
            {/* Texture folds */}
            <path d="M100 105 Q120 115 140 105" stroke="#E5A68D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M90 170 Q120 180 150 170" stroke="#A45535" strokeWidth="1" />
          </svg>
        )}
      </div>

      {badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white/95 text-[#A54F2E] rounded-md shadow-xs border border-[#F0E2DA]">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};
