import { NextResponse } from 'next/server';

type Message = {
  message: string;
};

export const GET = (): NextResponse<Message> => {
  return NextResponse.json({ message: 'OK' }, { status: 200 });
};
