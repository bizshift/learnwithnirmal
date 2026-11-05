'use client';

import React from 'react';

// Colorful, crisp 16x16 / 20x20 pixel-art SVG icons with sharp edges
interface PixelIconProps {
  className?: string;
  size?: number;
}

export function PixelInstagram({ className = '', size = 18 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-label="Instagram Pixel Icon"
    >
      {/* Outer rounded pixel border */}
      <rect x="2" y="1" width="12" height="14" fill="#E1306C" />
      <rect x="1" y="2" width="14" height="12" fill="#FD1D1D" />
      <rect x="2" y="2" width="12" height="12" fill="#F77737" />
      <rect x="2" y="7" width="12" height="7" fill="#C13584" />
      <rect x="3" y="11" width="10" height="3" fill="#833AB4" />
      {/* Inner lens */}
      <rect x="5" y="5" width="6" height="6" fill="#FFFFFF" />
      <rect x="6" y="6" width="4" height="4" fill="#C13584" />
      {/* Camera flash dot */}
      <rect x="11" y="3" width="2" height="2" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelYouTube({ className = '', size = 18 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-label="YouTube Pixel Icon"
    >
      {/* Red screen */}
      <rect x="1" y="3" width="14" height="10" fill="#FF0000" />
      <rect x="2" y="2" width="12" height="12" fill="#FF0000" />
      {/* Highlight line */}
      <rect x="2" y="3" width="12" height="1" fill="#FF5252" />
      {/* Play button triangle in white pixels */}
      <rect x="6" y="5" width="2" height="6" fill="#FFFFFF" />
      <rect x="8" y="6" width="2" height="4" fill="#FFFFFF" />
      <rect x="10" y="7" width="1" height="2" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelLinkedIn({ className = '', size = 18 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-label="LinkedIn Pixel Icon"
    >
      <rect x="1" y="1" width="14" height="14" fill="#0A66C2" />
      <rect x="2" y="2" width="12" height="1" fill="#3B82F6" />
      {/* "i" dot & body */}
      <rect x="3" y="4" width="2" height="2" fill="#FFFFFF" />
      <rect x="3" y="7" width="2" height="5" fill="#FFFFFF" />
      {/* "n" */}
      <rect x="7" y="7" width="2" height="5" fill="#FFFFFF" />
      <rect x="9" y="7" width="3" height="2" fill="#FFFFFF" />
      <rect x="11" y="8" width="2" height="4" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelGitHub({ className = '', size = 18 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-label="GitHub Pixel Icon"
    >
      <rect x="1" y="1" width="14" height="14" fill="#24292F" />
      {/* Ears */}
      <rect x="3" y="3" width="2" height="2" fill="#8B5CF6" />
      <rect x="11" y="3" width="2" height="2" fill="#8B5CF6" />
      {/* Face */}
      <rect x="4" y="4" width="8" height="7" fill="#C4B5FD" />
      {/* Eyes */}
      <rect x="5" y="6" width="2" height="2" fill="#1F2937" />
      <rect x="9" y="6" width="2" height="2" fill="#1F2937" />
      {/* Mouth */}
      <rect x="7" y="9" width="2" height="1" fill="#1F2937" />
    </svg>
  );
}

// Colorful pixel icons for the 4 Free Guides
export function PixelComfyNode({ className = '', size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      {/* Node A (violet) */}
      <rect x="1" y="2" width="5" height="5" fill="#8B5CF6" />
      <rect x="2" y="3" width="3" height="3" fill="#DDD6FE" />
      {/* Node B (cyan) */}
      <rect x="10" y="8" width="5" height="5" fill="#06B6D4" />
      <rect x="11" y="9" width="3" height="3" fill="#CFFAFE" />
      {/* Connecting pixel bus */}
      <rect x="6" y="4" width="2" height="2" fill="#A78BFA" />
      <rect x="8" y="6" width="2" height="2" fill="#38BDF8" />
    </svg>
  );
}

export function PixelVideoClapper({ className = '', size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      {/* Clapper top */}
      <rect x="1" y="2" width="14" height="4" fill="#F97316" />
      <rect x="3" y="2" width="2" height="4" fill="#FEF08A" />
      <rect x="8" y="2" width="2" height="4" fill="#FEF08A" />
      <rect x="13" y="2" width="1" height="4" fill="#FEF08A" />
      {/* Film body */}
      <rect x="1" y="6" width="14" height="8" fill="#EC4899" />
      <rect x="6" y="8" width="4" height="4" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelOpenSourceCube({ className = '', size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      {/* Isometric cube top */}
      <rect x="6" y="1" width="4" height="2" fill="#86EFAC" />
      <rect x="4" y="3" width="8" height="2" fill="#4ADE80" />
      <rect x="2" y="5" width="12" height="2" fill="#22C55E" />
      {/* Left side */}
      <rect x="2" y="7" width="6" height="7" fill="#15803D" />
      {/* Right side */}
      <rect x="8" y="7" width="6" height="7" fill="#166534" />
      {/* Center highlight */}
      <rect x="7" y="7" width="2" height="7" fill="#86EFAC" />
    </svg>
  );
}

export function PixelShortcutsBolt({ className = '', size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="1" width="4" height="3" fill="#FACC15" />
      <rect x="5" y="4" width="6" height="3" fill="#EAB308" />
      <rect x="3" y="7" width="10" height="2" fill="#CA8A04" />
      <rect x="7" y="9" width="4" height="3" fill="#FACC15" />
      <rect x="8" y="12" width="2" height="3" fill="#FDE047" />
    </svg>
  );
}

// Featured Store Pixel Cart
export function PixelStoreCart({ className = '', size = 20 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      {/* Cart Handle */}
      <rect x="2" y="3" width="3" height="2" fill="#10B981" />
      <rect x="4" y="5" width="2" height="2" fill="#10B981" />
      {/* Basket */}
      <rect x="5" y="7" width="13" height="6" fill="#059669" />
      <rect x="7" y="8" width="9" height="4" fill="#34D399" />
      {/* Coin inside */}
      <rect x="9" y="4" width="4" height="4" fill="#F59E0B" />
      <rect x="10" y="5" width="2" height="2" fill="#FEF08A" />
      {/* Wheels */}
      <rect x="7" y="14" width="3" height="3" fill="#111827" />
      <rect x="8" y="15" width="1" height="1" fill="#F59E0B" />
      <rect x="14" y="14" width="3" height="3" fill="#111827" />
      <rect x="15" y="15" width="1" height="1" fill="#F59E0B" />
    </svg>
  );
}

// Colorful pixel brand mark (gem / star)
export function PixelBrandGem({ className = '', size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="1" width="2" height="14" fill="#10B981" />
      <rect x="1" y="7" width="14" height="2" fill="#06B6D4" />
      <rect x="4" y="4" width="8" height="8" fill="#10B981" />
      <rect x="5" y="5" width="6" height="6" fill="#34D399" />
      <rect x="6" y="6" width="4" height="4" fill="#A7F3D0" />
      <rect x="7" y="7" width="2" height="2" fill="#FFFFFF" />
    </svg>
  );
}
