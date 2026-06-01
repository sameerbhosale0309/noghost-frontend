import { motion } from "motion/react";

export default function AnimatedBackground() {
  return (
    <div className="animated-bg-container">
      {/* Wave Layer 1 (Deepest/Back - Extra deep teal/green) */}
      <svg className="bg-wave bg-wave-1" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,300 C300,550 600,750 900,650 C1200,550 1350,380 1440,280 L1440,1000 Z" />
      </svg>

      {/* Wave Layer 2 (Deep teal/green) */}
      <svg className="bg-wave bg-wave-2" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,380 C200,630 500,800 800,720 C1100,640 1300,480 1440,350 L1440,1000 Z" />
      </svg>

      {/* Wave Layer 3 (Medium teal/green) */}
      <svg className="bg-wave bg-wave-3" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,480 C250,700 550,860 850,790 C1150,720 1320,580 1440,450 L1440,1000 Z" />
      </svg>

      {/* Wave Layer 4 (Sage green) */}
      <svg className="bg-wave bg-wave-4" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,580 C300,780 600,890 900,840 C1200,790 1350,680 1440,550 L1440,1000 Z" />
      </svg>

      {/* Wave Layer 5 (Light mint green) */}
      <svg className="bg-wave bg-wave-5" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,680 C350,840 650,920 950,890 C1250,860 1380,780 1440,680 L1440,1000 Z" />
      </svg>

      {/* Wave Layer 6 (Lightest overlay - Cream / Mint) */}
      <svg className="bg-wave bg-wave-6" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <path d="M0,1000 L0,780 C400,900 700,960 1000,930 C1300,900 1400,850 1440,780 L1440,1000 Z" />
      </svg>

      {/* 3D Isometric Grid Overlay - Left side */}
      <svg className="bg-grid-isometric bg-grid-isometric-left" viewBox="0 0 300 300">
        <g stroke="rgba(168, 203, 184, 0.25)" strokeWidth="1" fill="none">
          {/* Curved isometric web/mesh structure */}
          <path d="M10,250 C80,220 160,200 240,220" />
          <path d="M20,270 C90,230 170,210 250,230" />
          <path d="M30,290 C100,240 180,220 260,240" />
          
          <path d="M40,180 C80,210 100,260 110,290" />
          <path d="M80,185 C120,215 140,265 150,295" />
          <path d="M120,190 C160,220 180,270 190,300" />
          <path d="M160,195 C200,225 220,275 230,305" />

          {/* Perspective grid lines */}
          <line x1="10" y1="200" x2="150" y2="280" />
          <line x1="30" y1="180" x2="170" y2="260" />
          <line x1="50" y1="160" x2="190" y2="240" />
          <line x1="70" y1="140" x2="210" y2="220" />
          
          <line x1="10" y1="200" x2="100" y2="100" />
          <line x1="50" y1="220" x2="140" y2="120" />
          <line x1="90" y1="240" x2="180" y2="140" />
          <line x1="130" y1="260" x2="220" y2="160" />
        </g>
      </svg>

      {/* 3D Isometric Grid Overlay - Right/Center bottom */}
      <svg className="bg-grid-isometric bg-grid-isometric-right" viewBox="0 0 400 300">
        <g stroke="rgba(168, 203, 184, 0.2)" strokeWidth="0.8" fill="none">
          {/* Curved isometric mesh grid */}
          <path d="M0,150 Q100,100 200,150 T400,150" />
          <path d="M0,175 Q100,125 200,175 T400,175" />
          <path d="M0,200 Q100,150 200,200 T400,200" />
          <path d="M0,225 Q100,175 200,225 T400,225" />
          <path d="M0,250 Q100,200 200,250 T400,250" />

          <path d="M50,100 Q60,200 70,300" />
          <path d="M100,100 Q110,200 120,300" />
          <path d="M150,100 Q160,200 170,300" />
          <path d="M200,100 Q210,200 220,300" />
          <path d="M250,100 Q260,200 270,300" />
          <path d="M300,100 Q310,200 320,300" />
        </g>
      </svg>

      {/* Cloud Computing Tech Diagram - Top Right */}
      <div className="bg-cloud-diagram">
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          {/* Cloud Outline */}
          <path 
            d="M 50 110 
               A 22 22 0 0 1 82 82 
               A 32 32 0 0 1 138 82 
               A 22 22 0 0 1 170 110 
               A 18 18 0 0 1 170 134 
               L 50 134 
               A 18 18 0 0 1 50 110 Z" 
            fill="rgba(255, 255, 255, 0.4)" 
            stroke="rgba(168, 203, 184, 0.4)" 
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Cloud Server Details (Inside cloud representation) */}
          <rect x="85" y="105" width="50" height="8" rx="2" fill="none" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />
          <circle cx="93" cy="109" r="1.5" fill="rgba(168, 203, 184, 0.8)" />
          <circle cx="101" cy="109" r="1.5" fill="rgba(168, 203, 184, 0.8)" />
          <line x1="115" y1="109" x2="130" y2="109" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />

          <rect x="85" y="118" width="50" height="8" rx="2" fill="none" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />
          <circle cx="93" cy="122" r="1.5" fill="rgba(168, 203, 184, 0.8)" />
          <circle cx="101" cy="122" r="1.5" fill="rgba(168, 203, 184, 0.8)" />
          <line x1="115" y1="122" x2="130" y2="122" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />

          {/* Branching circuit lines dropping down */}
          <g stroke="rgba(168, 203, 184, 0.35)" strokeWidth="1" fill="none">
            {/* Center Branch */}
            <line x1="110" y1="134" x2="110" y2="175" strokeDasharray="2 2" />
            <circle cx="110" cy="175" r="3" fill="none" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />
            
            {/* Left Branch */}
            <path d="M 85,134 L 85,155 L 60,155 L 60,185" />
            <circle cx="60" cy="185" r="3" fill="rgba(168, 203, 184, 0.5)" />
            
            {/* Right Branch */}
            <path d="M 135,134 L 135,150 L 160,150 L 160,190" />
            <circle cx="160" cy="190" r="3" fill="none" stroke="rgba(168, 203, 184, 0.6)" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Sparkle Star Shape - Bottom Right */}
      <motion.div 
        className="bg-sparkle-star"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 50 50" width="100%" height="100%">
          <path d="M 25 0 Q 25 25 50 25 Q 25 25 25 50 Q 25 25 0 25 Q 25 25 25 0 Z" fill="#ffffff" />
        </svg>
      </motion.div>
    </div>
  );
}
