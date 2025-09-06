import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.message) return NextResponse.json({}, { status: 200 });

    const chatId = body.message.chat.id;
    const text = body.message.text;
    const token = process.env.VOLUNTEER_BOT_TOKEN;

    if (!token) {
      console.error('Bot token missing');
      return NextResponse.json({ error: 'Bot token missing' }, { status: 500 });
    }

    if (text?.startsWith('/start')) {
      const sessionUid = text.split(' ')[1];
      
      if (!sessionUid) {
        await sendMessage(chatId, `👋 Welcome! How can I help you today?`, token);
      } else {
        await sendMessage(chatId, `👋 Welcome! You are starting session: ${sessionUid}`, token);
      }
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function sendMessage(chatId: number, text: string, token: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });
}
