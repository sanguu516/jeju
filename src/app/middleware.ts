// import { COOKIE_ACCESS_TOKEN } from '@/config/constants';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
//   // Getting cookies from the request using the `RequestCookies` API
//   let cookie = request.cookies.get(COOKIE_ACCESS_TOKEN);
//   console.log('cookie', cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
//   const allCookies = request.cookies.getAll();
//   console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

//   request.cookies.has(COOKIE_ACCESS_TOKEN); // => true
//   request.cookies.delete('jeju_accs');
//   request.cookies.has('jeju_accs'); // => false

//   if (request.nextUrl.pathname.startsWith('/mypage')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url));
//   }

// Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next();
//   response.cookies.set('vercel', 'fast');
//   response.cookies.set({
//     name: 'vercel',
//     value: 'fast',
//     path: '/'
//   });
//   cookie = response.cookies.get('vercel');
//   console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
//   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

//   return response;
// }
