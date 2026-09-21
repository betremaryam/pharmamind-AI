import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ThreeDimensionalDrugIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  badgeText?: string;
}

export const ThreeDimensionalDrugIcon: React.FC<ThreeDimensionalDrugIconProps> = ({
  size = 'md',
  interactive = true,
  onClick,
  className = '',
  badgeText
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateOffset, setRotateOffset] = useState({ x: 0, y: 0 });

  const sizeDimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateOffset({
      x: Math.max(-18, Math.min(18, -y / 2)),
      y: Math.max(-18, Math.min(18, x / 2))
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${interactive ? 'cursor-pointer' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 800 }}
      whileHover={interactive ? { scale: 1.06 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      title={interactive ? '3D PharmaMind Molecular Capsule · Click to explore bedside clinical tools' : undefined}
    >
      {/* Ambient Radial Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#1E6B5E]/30 via-[#2ED1B2]/20 to-transparent blur-md transition-opacity duration-300 ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-60 scale-100'
        }`}
      />

      {/* 3D Rotational Capsule Container */}
      <motion.div
        className={`relative ${sizeDimensions[size]} flex items-center justify-center filter drop-shadow-[0_10px_14px_rgba(18,70,60,0.25)]`}
        animate={{
          rotateX: rotateOffset.x,
          rotateY: rotateOffset.y,
          rotateZ: isHovered ? 12 : 0
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Deep 3D Emerald Capsule Gradient (Upper Half) */}
            <linearGradient id="emeraldCapGrad" x1="20" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#48C4AD" />
              <stop offset="35%" stopColor="#1E6B5E" />
              <stop offset="85%" stopColor="#12463C" />
              <stop offset="100%" stopColor="#0B2A24" />
            </linearGradient>

            {/* Specular White/Pearl Lower Half Gradient */}
            <linearGradient id="pearlCapGrad" x1="30" y1="50" x2="105" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FAF8F5" />
              <stop offset="70%" stopColor="#D8D2C5" />
              <stop offset="100%" stopColor="#A8A090" />
            </linearGradient>

            {/* Glossy High-Light Arc */}
            <linearGradient id="glintSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Metallic Central Band Divider */}
            <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5E8BA" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6D1F" />
            </linearGradient>

            {/* Ambient Shadow under capsule */}
            <radialGradient id="capsuleDropShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10201C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10201C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dynamic 3D Projected Ground Shadow */}
          <ellipse
            cx="60"
            cy="106"
            rx={isHovered ? '42' : '36'}
            ry="10"
            fill="url(#capsuleDropShadow)"
            className="transition-all duration-300"
          />

          {/* Rotated 3D Capsule Pill Body (Diagonal Orientation) */}
          <g transform="rotate(-36 60 60)">
            {/* Lower Half of Capsule (Pearl White Bio-Carrier) */}
            <path
              d="M38 60 H82 V80 C82 92.15 72.15 102 60 102 C47.85 102 38 92.15 38 80 Z"
              fill="url(#pearlCapGrad)"
            />

            {/* Pearl Lower Curvature Bevel */}
            <path
              d="M42 60 H78 V80 C78 89.9 70 98 60 98 C50 98 42 89.9 42 80 Z"
              fill="#FFFFFF"
              fillOpacity="0.25"
            />

            {/* Active Granules / Nanospheres visible through pearl matrix */}
            <circle cx="50" cy="74" r="2.5" fill="#1E6B5E" fillOpacity="0.6" />
            <circle cx="68" cy="76" r="3" fill="#1E6B5E" fillOpacity="0.5" />
            <circle cx="58" cy="86" r="2.2" fill="#D4AF37" fillOpacity="0.7" />
            <circle cx="64" cy="67" r="1.8" fill="#1E6B5E" fillOpacity="0.4" />

            {/* Upper Half of Capsule (Deep Emerald Clinical Polymer) */}
            <path
              d="M38 60 H82 V40 C82 27.85 72.15 18 60 18 C47.85 18 38 27.85 38 40 Z"
              fill="url(#emeraldCapGrad)"
            />

            {/* 3D Ring Band connecting the two halves */}
            <rect x="36.5" y="58" width="47" height="4.5" rx="2" fill="url(#ringGold)" />
            <rect x="37.5" y="59" width="45" height="1.5" rx="0.75" fill="#FFF8E0" fillOpacity="0.8" />

            {/* Medical Rx & Caduceus Emblem in Upper Emerald Dome */}
            <path
              d="M53 33 H58 C60.5 33 62 34.2 62 36.5 C62 38.8 60.5 40 58 40 H55.5 V45 H53 V33 Z M55.5 37.8 H58 C59.2 37.8 59.8 37.3 59.8 36.5 C59.8 35.7 59.2 35.2 58 35.2 H55.5 V37.8 Z"
              fill="#FFFFFF"
              fillOpacity="0.9"
            />
            <path
              d="M58 39.5 L64 45 M64 40.5 L60 44"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />

            {/* 3D Specular Curvature Light Flare (Along Left Ridge) */}
            <path
              d="M42 36 C42 28 48 24 54 22 C48 25 45 30 45 38 V82 C45 88 48 93 54 96 C48 93 42 88 42 82 Z"
              fill="url(#glintSheen)"
            />

            {/* Glossy Top Dome Highlight */}
            <ellipse
              cx="53"
              cy="27"
              rx="6"
              ry="3"
              transform="rotate(-25 53 27)"
              fill="#FFFFFF"
              fillOpacity="0.7"
            />
          </g>

          {/* Molecular Orbit Ring (Interactive Orbiting Particles) */}
          <ellipse
            cx="60"
            cy="60"
            rx="52"
            ry="22"
            transform="rotate(24 60 60)"
            stroke="url(#ringGold)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity={isHovered ? '0.75' : '0.4'}
            className="transition-opacity duration-300"
          />

          {/* Orbiting Molecular Node 1 */}
          <circle
            cx={isHovered ? '24' : '26'}
            cy="46"
            r="4.5"
            fill="#1E6B5E"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            className="transition-all duration-300 shadow-sm"
          />
          {/* Orbiting Molecular Node 2 */}
          <circle
            cx={isHovered ? '96' : '94'}
            cy="74"
            r="3.5"
            fill="#2ED1B2"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="transition-all duration-300 shadow-sm"
          />
        </svg>
      </motion.div>

      {/* Optional Badge Label */}
      {badgeText && (
        <span className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[0.62rem] font-bold bg-[#10201C] text-[#8FB8AC] border border-[#2A453E] whitespace-nowrap shadow-xs">
          {badgeText}
        </span>
      )}
    </motion.div>
  );
};
