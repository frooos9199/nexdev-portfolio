import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { defaultMenu, MenuSection } from '@/data/menu';
import { isAdminRequest } from '@/lib/adminSession';

export const dynamic = 'force-dynamic';

const MENU_PATH = 'hokah-mood/menu.json';
const DEFAULT_LOGO = '/hokah-mood-logo.svg';

type MenuState = {
  sections: MenuSection[];
  logo: string;
  updatedAt: string;
};

const defaultState = (): MenuState => ({
  sections: defaultMenu,
  logo: DEFAULT_LOGO,
  updatedAt: new Date(0).toISOString(),
});

export async function GET() {
  try {
    const result = await get(MENU_PATH, { access: 'public', useCache: false });
    if (!result?.stream) {
      return NextResponse.json({ ...defaultState(), isDefault: true });
    }

    const state = await new Response(result.stream).json() as MenuState;
    return NextResponse.json({ ...state, isDefault: false }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Unable to load menu state', error);
    return NextResponse.json({ ...defaultState(), isDefault: true });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  const body = await request.json() as Partial<MenuState>;
  if (!Array.isArray(body.sections) || typeof body.logo !== 'string') {
    return NextResponse.json({ error: 'بيانات المنيو غير صالحة' }, { status: 400 });
  }

  if (body.logo.length > 1_500_000) {
    return NextResponse.json({ error: 'حجم الشعار كبير جدًا' }, { status: 413 });
  }

  const state: MenuState = {
    sections: body.sections,
    logo: body.logo,
    updatedAt: new Date().toISOString(),
  };

  await put(MENU_PATH, JSON.stringify(state), {
    access: 'public',
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    contentType: 'application/json',
  });

  return NextResponse.json(state);
}