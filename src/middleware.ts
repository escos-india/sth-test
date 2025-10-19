import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');

  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authCookie || authCookie.value !== 'true') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  if (request.nextUrl.pathname.startsWith('/sthapati')) {
      if (!authCookie || authCookie.value !== 'true') {
          if(request.nextUrl.pathname !== '/sthapati/login'){
            const loginUrl = new URL('/sthapati/login', request.url);
            return NextResponse.redirect(loginUrl);
          }
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard', '/sthapati/:path*'],
};
