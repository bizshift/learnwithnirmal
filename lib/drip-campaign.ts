import { StoreProduct, STORE_PRODUCTS } from './store-data';

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export interface AbandonedCartRecord {
  id: string;
  customerName?: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
  abandonedAt: string; // ISO string
  recoveryToken: string;
  status: 'abandoned' | 'drip_1_sent' | 'drip_2_sent' | 'drip_3_sent' | 'recovered' | 'expired';
  recoveredAt?: string;
  lastDripSentAt?: string;
  abandonmentTrigger?: 'exit_intent' | 'cart_close' | 'inactivity_timeout' | 'page_leave';
}

export interface DripStageConfig {
  stage: 1 | 2 | 3;
  name: string;
  delayLabel: string;
  delayMinutes: number;
  subject: string;
  preheader: string;
  intent: string;
  expectedRecoveryRate: string;
  includeCoupon: boolean;
  couponCode?: string;
  headline: string;
  bodyParagraphs: string[];
  ctaLabel: string;
  urgencyNote?: string;
}

export const DRIP_CAMPAIGN_STAGES: DripStageConfig[] = [
  {
    stage: 1,
    name: "Stage 1: The Helpful Nudge",
    delayLabel: "30 Minutes After Abandonment",
    delayMinutes: 30,
    subject: "Did your internet drop? We saved your cart 🛒",
    preheader: "Your items are still waiting for you. Restore your cart with 1 click.",
    intent: "Helpful, zero friction, assumes technical interruption or temporary distraction.",
    expectedRecoveryRate: "12% – 18%",
    includeCoupon: false,
    headline: "Hey, did life get in the way?",
    bodyParagraphs: [
      "We noticed you were checking out some blueprints and tools from Nirmal's studio, but didn't get a chance to finish.",
      "Good news: we saved everything in your cart so you don't have to start over. All your files, download links, and resources are reserved and ready for you.",
      "Click below to jump right back to your cart and grab your instant access."
    ],
    ctaLabel: "Complete My Order →",
    urgencyNote: "Your items are held in temporary reservation."
  },
  {
    stage: 2,
    name: "Stage 2: The Trust & Proof Follow-Up",
    delayLabel: "24 Hours After Abandonment",
    delayMinutes: 1440,
    subject: "Quick question about your order + answers you might need",
    preheader: "Here is what is included, student results, and how our 100% guarantee works.",
    intent: "Overcomes hesitation, answers common questions, highlights reviews and guarantee.",
    expectedRecoveryRate: "8% – 14%",
    includeCoupon: false,
    headline: "Still thinking it over? Let me make it easy.",
    bodyParagraphs: [
      "I know how it feels when buying digital tools online — you wonder if it really works, if it will save you time, or if you'll actually use it.",
      "Here's my promise: everything in this pack has been battle-tested in real client work and YouTube productions. Hundreds of creators and builders are already using these exact blueprints to save thousands of rupees every month.",
      "Plus, you get direct email support if you get stuck with any step. Zero risk."
    ],
    ctaLabel: "Claim My Access Now →",
    urgencyNote: "Direct support from Nirmal included with every order."
  },
  {
    stage: 3,
    name: "Stage 3: The 15% Urgency Closer",
    delayLabel: "72 Hours After Abandonment (Final Notice)",
    delayMinutes: 4320,
    subject: "Final reminder: 15% discount before your cart expires (Code: COMEBACK15)",
    preheader: "We're releasing your reserved cart in 6 hours. Save 15% if you complete today.",
    intent: "Maximum urgency, scarcity, and a dedicated 15% discount code to close the sale.",
    expectedRecoveryRate: "6% – 10%",
    includeCoupon: true,
    couponCode: "COMEBACK15",
    headline: "Your cart reservation expires today (Here's 15% off).",
    bodyParagraphs: [
      "This is our final reminder before your reserved digital bundle is cleared from our checkout system.",
      "To help you take action today and launch your project, I've created an exclusive 15% off voucher just for you.",
      "Use coupon code COMEBACK15 at checkout (or click the button below to have it applied automatically)."
    ],
    ctaLabel: "Apply 15% Off & Get Access →",
    urgencyNote: "⚠️ Coupon COMEBACK15 expires in 6 hours."
  }
];

/**
 * Generates responsive, inline-styled HTML email for any abandoned cart drip stage
 */
export function generateDripEmailHtml(
  cart: AbandonedCartRecord,
  stageNumber: 1 | 2 | 3,
  siteUrl: string = "http://localhost:3000"
): string {
  const stage = DRIP_CAMPAIGN_STAGES.find((s) => s.stage === stageNumber) || DRIP_CAMPAIGN_STAGES[0];
  const couponQuery = stage.includeCoupon && stage.couponCode ? `&coupon=${stage.couponCode}` : "";
  const recoveryUrl = `${siteUrl}/?recover_cart=${cart.recoveryToken}${couponQuery}`;

  const itemsHtml = cart.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #222222;">
        <div style="font-family: monospace; font-size: 14px; font-weight: bold; color: #111111;">
          ${item.product.title}
        </div>
        <div style="font-family: monospace; font-size: 11px; color: #666666; margin-top: 2px;">
          Qty: ${item.quantity} · ${item.product.category}
        </div>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #222222; text-align: right; font-family: monospace; font-size: 14px; font-weight: bold; color: #059669;">
        ₹${(item.product.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${stage.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 580px; margin: 30px auto; background-color: #ffffff; border: 2px solid #000000; box-shadow: 4px 4px 0px 0px #000000;">
    
    <!-- Top Header Bar -->
    <div style="background-color: #064E3B; padding: 16px 24px; border-bottom: 2px solid #000000; color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <div style="font-family: monospace; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: #6EE7B7;">
              [ NIRMAL · CREATIVE LAB &amp; STUDIO ]
            </div>
            <div style="font-size: 18px; font-weight: 800; margin-top: 4px; color: #ffffff;">
              Cart Reservation Notice
            </div>
          </td>
          <td style="text-align: right;">
            <span style="background-color: #10B981; color: #000000; font-family: monospace; font-size: 10px; font-weight: bold; padding: 4px 8px; border: 1px solid #000000;">
              STAGE 0${stage.stage}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Email Body -->
    <div style="padding: 28px 24px;">
      
      <!-- Greeting & Headline -->
      <h2 style="font-size: 20px; font-weight: 800; color: #111111; margin-top: 0; margin-bottom: 12px; letter-spacing: -0.5px;">
        ${stage.headline}
      </h2>

      ${stage.bodyParagraphs
        .map(
          (p) => `
        <p style="font-size: 14px; line-height: 1.6; color: #333333; margin: 10px 0;">
          ${p}
        </p>
      `
        )
        .join("")}

      <!-- Special Coupon Banner if applicable -->
      ${
        stage.includeCoupon && stage.couponCode
          ? `
        <div style="margin: 20px 0; background-color: #ECFDF5; border: 2px dashed #059669; padding: 14px 18px;">
          <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #065F46; text-transform: uppercase;">
            🎁 EXCLUSIVE RECOVERY DISCOUNT:
          </div>
          <div style="font-family: monospace; font-size: 22px; font-weight: 900; color: #047857; margin: 4px 0;">
            ${stage.couponCode}
          </div>
          <div style="font-size: 12px; color: #065F46;">
            Save 15% off your entire cart automatically when you restore today.
          </div>
        </div>
      `
          : ""
      }

      <!-- Saved Cart Breakdown Box -->
      <div style="margin: 24px 0; background-color: #FAFAFA; border: 1px solid #DDDDDD; padding: 16px 20px;">
        <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #555555; text-transform: uppercase; border-bottom: 1px solid #CCCCCC; padding-bottom: 8px;">
          ITEMS RESERVED IN YOUR CART:
        </div>
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
          ${itemsHtml}
          <tr>
            <td style="padding-top: 12px; font-family: monospace; font-size: 13px; font-weight: bold; color: #111111;">
              Cart Total:
            </td>
            <td style="padding-top: 12px; text-align: right; font-family: monospace; font-size: 16px; font-weight: 900; color: #111111;">
              ₹${cart.total.toLocaleString()}
            </td>
          </tr>
        </table>
      </div>

      <!-- Primary CTA Button -->
      <div style="text-align: center; margin: 28px 0 16px 0;">
        <a href="${recoveryUrl}" target="_blank" style="display: inline-block; background-color: #10B981; color: #000000; font-family: monospace; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 28px; border: 2px solid #000000; box-shadow: 3px 3px 0px 0px #000000; text-transform: uppercase;">
          ${stage.ctaLabel}
        </a>
      </div>

      ${
        stage.urgencyNote
          ? `
        <div style="text-align: center; font-family: monospace; font-size: 11px; color: #666666;">
          ${stage.urgencyNote}
        </div>
      `
          : ""
      }

      <!-- Sign-off -->
      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #EEEEEE; font-size: 13px; color: #555555;">
        <div>Cheers,</div>
        <div style="font-weight: bold; color: #111111; margin-top: 2px;">Nirmal</div>
        <div style="font-family: monospace; font-size: 11px; color: #888888;">Creator &amp; Builder · Zenthra Studios</div>
      </div>

    </div>

    <!-- Email Footer -->
    <div style="background-color: #F3F4F6; padding: 14px 24px; border-top: 1px solid #E5E7EB; text-align: center; font-family: monospace; font-size: 10px; color: #888888;">
      You received this message because you started checkout at nirmal.bio / lifedemy.in.
      <br>
      To manage your notifications or unsubscribe, <a href="#" style="color: #666666; text-decoration: underline;">click here</a>.
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * Realistic initial mock data for the abandoned carts tracker
 */
export const INITIAL_ABANDONED_CARTS: AbandonedCartRecord[] = [
  {
    id: "cart_abc101",
    customerName: "Vikram Sharma",
    customerEmail: "vikram.design@gmail.com",
    items: [
      { product: STORE_PRODUCTS[0], quantity: 1 },
      { product: STORE_PRODUCTS[1], quantity: 1 }
    ],
    subtotal: 1298,
    discount: 0,
    total: 1298,
    abandonedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 mins ago
    recoveryToken: "rec_7f8a9b1c",
    status: "drip_1_sent",
    lastDripSentAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    abandonmentTrigger: "exit_intent"
  },
  {
    id: "cart_def202",
    customerName: "Sneha Patel",
    customerEmail: "sneha.creates@outlook.com",
    items: [
      { product: STORE_PRODUCTS[2], quantity: 1 }
    ],
    subtotal: 999,
    discount: 0,
    total: 999,
    abandonedAt: new Date(Date.now() - 25 * 3600 * 1000).toISOString(), // 25 hours ago
    recoveryToken: "rec_4d5e6f7a",
    status: "drip_2_sent",
    lastDripSentAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    abandonmentTrigger: "inactivity_timeout"
  },
  {
    id: "cart_ghi303",
    customerName: "Arjun Verma",
    customerEmail: "arjun.ai@gmail.com",
    items: [
      { product: STORE_PRODUCTS[3], quantity: 1 },
      { product: STORE_PRODUCTS[0], quantity: 1 }
    ],
    subtotal: 1998,
    discount: 299,
    total: 1699,
    appliedCoupon: "COMEBACK15",
    abandonedAt: new Date(Date.now() - 76 * 3600 * 1000).toISOString(), // 76 hours ago
    recoveryToken: "rec_1a2b3c4d",
    status: "recovered",
    recoveredAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    lastDripSentAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    abandonmentTrigger: "cart_close"
  },
  {
    id: "cart_jkl404",
    customerName: "Rohan Nair",
    customerEmail: "rohan.builds@gmail.com",
    items: [
      { product: STORE_PRODUCTS[1], quantity: 1 }
    ],
    subtotal: 799,
    discount: 0,
    total: 799,
    abandonedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    recoveryToken: "rec_9z8y7x6w",
    status: "abandoned",
    abandonmentTrigger: "exit_intent"
  }
];
