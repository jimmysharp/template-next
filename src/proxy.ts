import { type NextRequest, NextResponse } from 'next/server';

import { Logger } from '#/log/logger';

export const proxy = (req: NextRequest): NextResponse => {
  const logger = new Logger();
  logger.access(req);

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api/healthcheck|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};
