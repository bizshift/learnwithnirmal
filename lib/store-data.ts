export interface StoreProduct {
  id: string;
  title: string;
  category: string;
  price: number; // in INR
  originalPrice: number;
  badge?: string;
  tagline: string;
  description: string;
  coverImage: string;
  features: string[];
  deliverables: string;
  downloadFileName?: string;
}

export interface CouponCode {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  description: string;
  minCartValue?: number;
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "store-blueprint-pro",
    title: "₹0 Online Store Pro Blueprint",
    category: "Developer Starter Kit",
    price: 499,
    originalPrice: 1999,
    badge: "Bestseller · 75% OFF",
    tagline: "Full production Next.js store template, Razorpay/Stripe checkout, and 0-monthly-cost hosting blueprint.",
    description: "Launch your own online store without paying Shopify ₹3,000–₹15,000 every single month. Complete source code, step-by-step video walkthrough, and webhook order notifications.",
    coverImage: "/assets/images/pixel_store.jpg",
    features: [
      "Next.js 15 App Router source code with responsive cart & checkout",
      "Razorpay & Stripe payment links with automated receipt delivery",
      "Free-tier cloud deployment guide (Vercel, Cloudflare, Dokploy)",
      "Instant Telegram/Discord push notifications on every new order"
    ],
    deliverables: "Instant ZIP download + GitHub Private Repo Access + Video Guide",
    downloadFileName: "zero-rupees-store-blueprint-v2.zip"
  },
  {
    id: "comfyui-vault",
    title: "ComfyUI Pro Workflow Vault",
    category: "AI Generation Pipeline",
    price: 799,
    originalPrice: 2499,
    badge: "AI Creator Pack",
    tagline: "25+ curated production workflows, FLUX & SDXL setups, and VRAM crash-prevention scripts.",
    description: "Tired of broken custom nodes and CUDA out-of-memory errors? Get Nirmal's private library of battle-tested ComfyUI pipelines optimized for high-speed generation.",
    coverImage: "/assets/images/pixel_comfyui.jpg",
    features: [
      "25+ verified .json workflows for FLUX.1, SDXL, and ControlNet",
      "1-Click VRAM auto-tuner batch script for 6GB/8GB/12GB GPUs",
      "Upscaling & face-enhancer node trees that preserve texture",
      "Lifetime updates as new open-source models release"
    ],
    deliverables: "25+ JSON Workflow Files + Model Download Cheat Sheet + Setup PDF",
    downloadFileName: "nirmal-comfyui-pro-vault.zip"
  },
  {
    id: "ai-video-pack",
    title: "AI Video Creator Masterpack",
    category: "Video & Motion",
    price: 999,
    originalPrice: 3999,
    badge: "Creator Favorite",
    tagline: "Cinematic prompt vault, camera motion formulas, and multi-scene storytelling templates.",
    description: "The complete system Nirmal uses to create viral Instagram reels and cinematic videos using Runway Gen-3, Luma Dream Machine, and Kling AI.",
    coverImage: "/assets/images/pixel_video.jpg",
    features: [
      "120+ tested cinematic prompts with visual style references",
      "Camera movement syntax guide (pan, tilt, orbit, rack focus)",
      "Audio sync timeline markers and sound design pack",
      "Commercial usage rights for client and personal projects"
    ],
    deliverables: "PDF Prompt Vault + Motion Presets + 40 Royalty-Free Audio FX",
    downloadFileName: "ai-video-masterpack-2026.zip"
  },
  {
    id: "windows-tools-commercial",
    title: "Windows Apps Developer License",
    category: "Software Source Code",
    price: 1499,
    originalPrice: 4999,
    badge: "Developer Bundle",
    tagline: "Full source code and commercial rights for PC Console, Little Notes, Third Space & Orbit.",
    description: "Build upon Nirmal's 4 native Windows desktop tools. Includes full C# / .NET 10 / Electron source code, graphics assets, and white-label rights.",
    coverImage: "/assets/images/pixel_opensource.jpg",
    features: [
      "Full source code for Orbit, PC Console, Little Notes & Third Space",
      "WPF, .NET 10, and Electron architectures with build scripts",
      "Complete SVG and pixel artwork master assets",
      "White-label commercial license to customize and resell"
    ],
    deliverables: "Git Repository Access + Complete Solution Files + Assets Pack",
    downloadFileName: "nirmal-windows-apps-commercial-pack.zip"
  }
];

export const DISCOUNT_COUPONS: Record<string, CouponCode> = {
  "COMEBACK15": {
    code: "COMEBACK15",
    discountPercent: 15,
    description: "15% Abandoned Cart Recovery Discount"
  },
  "NIRMAL10": {
    code: "NIRMAL10",
    discountPercent: 10,
    description: "10% Bio Link Community Discount"
  },
  "VIP20": {
    code: "VIP20",
    discountPercent: 20,
    description: "20% Exclusive Member Discount"
  },
  "WELCOME100": {
    code: "WELCOME100",
    discountFlat: 100,
    minCartValue: 400,
    description: "₹100 Flat Welcome Discount"
  }
};
