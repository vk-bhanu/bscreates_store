import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that can have longer cache duration
const isPublicRoute = createRouteMatcher([
  '/',               // Home page
  '/about',          // Example public pages
  '/api/public/:path*' // Public API routes, if any
]);

export default clerkMiddleware((auth, request) => {
  const response = NextResponse.next();

  if (isPublicRoute(request)) {
    // For public routes: allow caching with a longer max-age
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  } else {
    // For authenticated or sensitive routes: prevent caching or set shorter cache duration
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
    
    // Protect routes requiring authentication
    auth().protect();
  }

  return response;
});

export const config = {
  matcher: [
    // Match all routes except static assets and Next.js internal files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
