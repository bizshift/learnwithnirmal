import { NextRequest, NextResponse } from 'next/server';
import {
  AbandonedCartRecord,
  INITIAL_ABANDONED_CARTS,
  DRIP_CAMPAIGN_STAGES,
  generateDripEmailHtml,
} from '@/lib/drip-campaign';

// In-memory store for server runtime (backed by INITIAL_ABANDONED_CARTS)
let serverAbandonedCarts: AbandonedCartRecord[] = [...INITIAL_ABANDONED_CARTS];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'list';

  if (action === 'analytics') {
    const totalAbandoned = serverAbandonedCarts.length;
    const totalRecovered = serverAbandonedCarts.filter((c) => c.status === 'recovered').length;
    const recoveryRate =
      totalAbandoned > 0 ? ((totalRecovered / totalAbandoned) * 100).toFixed(1) : '0';
    const totalRevenueRecovered = serverAbandonedCarts
      .filter((c) => c.status === 'recovered')
      .reduce((sum, c) => sum + c.total, 0);
    const activeAbandonments = serverAbandonedCarts.filter(
      (c) => c.status !== 'recovered' && c.status !== 'expired'
    ).length;

    return NextResponse.json({
      totalAbandoned,
      totalRecovered,
      recoveryRate: `${recoveryRate}%`,
      totalRevenueRecovered,
      activeAbandonments,
      stagesConfig: DRIP_CAMPAIGN_STAGES,
    });
  }

  // Default: list abandoned carts
  return NextResponse.json({
    carts: serverAbandonedCarts,
    count: serverAbandonedCarts.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'abandon') {
      const cart: AbandonedCartRecord = body.cart;
      if (!cart || !cart.customerEmail) {
        return NextResponse.json({ error: 'Missing cart or customer email' }, { status: 400 });
      }

      const existingIndex = serverAbandonedCarts.findIndex((c) => c.id === cart.id);
      if (existingIndex >= 0) {
        serverAbandonedCarts[existingIndex] = {
          ...serverAbandonedCarts[existingIndex],
          ...cart,
        };
      } else {
        serverAbandonedCarts.unshift(cart);
      }

      return NextResponse.json({
        success: true,
        message: 'Abandoned cart recorded in drip pipeline',
        cartId: cart.id,
      });
    }

    if (action === 'recover') {
      const { cartId } = body;
      const target = serverAbandonedCarts.find((c) => c.id === cartId);
      if (target) {
        target.status = 'recovered';
        target.recoveredAt = new Date().toISOString();
      }
      return NextResponse.json({
        success: true,
        message: 'Cart marked as recovered',
      });
    }

    if (action === 'send_drip') {
      const { cartId, stageNumber, recipientEmail } = body;
      const target = serverAbandonedCarts.find((c) => c.id === cartId) || serverAbandonedCarts[0];

      if (!target) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }

      const stage = (stageNumber as 1 | 2 | 3) || 1;
      const html = generateDripEmailHtml(
        target,
        stage,
        process.env.APP_URL || 'http://localhost:3000'
      );

      // Update status
      target.lastDripSentAt = new Date().toISOString();
      if (stage === 1) target.status = 'drip_1_sent';
      if (stage === 2) target.status = 'drip_2_sent';
      if (stage === 3) target.status = 'drip_3_sent';

      return NextResponse.json({
        success: true,
        message: `Drip Stage 0${stage} simulated successfully to ${recipientEmail || target.customerEmail}`,
        stage,
        subject: DRIP_CAMPAIGN_STAGES.find((s) => s.stage === stage)?.subject,
        htmlPreview: html,
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
