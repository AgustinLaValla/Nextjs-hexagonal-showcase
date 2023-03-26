import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { jwt } from '@/infrastucture/adapters';
import { config as appConfig } from '@/config';

const paths = {
  tokenError: '/api/token-error'
}

const messages = {
  invalidToken: 'Invalid Token',
  tokenRequired: 'Token Required',
  expiredToken: 'Token has expired. Please login again'
}

const cloneURL = (req: NextRequest, newPath: string, message?: string) => {
  const clonedURL = req.nextUrl.clone();
  clonedURL.pathname = newPath;
  if (!!message) {
    clonedURL.search = `?message=${message}`
  }
  return clonedURL;
}

export default async function middleware(req: NextRequest) {

  const token = req.headers.get('authorization');

  if (!token) {
    return NextResponse.rewrite(cloneURL(req, paths.tokenError, messages.tokenRequired));
  }

  try {
    const payload = await jwt.verify(token, appConfig.jwtSecret);
    console.log(payload);
  } catch (error) {
    console.log(error);
    return (error as any).code === 'ERR_JWT_EXPIRED'
      ? NextResponse.rewrite(cloneURL(req, paths.tokenError, messages.expiredToken))
      : NextResponse.rewrite(cloneURL(req, paths.tokenError, messages.invalidToken))
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    // '/api/todos',
    '/api/todos/:path*'
  ]
}