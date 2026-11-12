import { NextResponse } from 'next/server';
import { FREE_APPS } from '@/lib/bio-data';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;
  const app = FREE_APPS.find((a) => a.id.toLowerCase() === id.toLowerCase());

  if (!app || !app.downloadUrl) {
    return NextResponse.json(
      {
        error: 'App not found or no download available',
        validApps: FREE_APPS.map((a) => a.id),
      },
      { status: 404 }
    );
  }

  return NextResponse.redirect(app.downloadUrl, 302);
}

