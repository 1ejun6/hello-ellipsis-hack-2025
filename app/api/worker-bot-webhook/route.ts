import { NextRequest, NextResponse } from 'next/server';

const MIGRANT_BOT_TOKEN = process.env.MIGRANT_BOT_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.message) return NextResponse.json({}, { status: 200 });

    const chatId = body.message.chat.id;
    const text = body.message.text;

    if (!text) return NextResponse.json({}, { status: 200 });

    if (text.startsWith('/start')) {
      const sessionUid = text.split(' ')[1];
      if (!sessionUid) {
        await sendMessage(chatId, '👋 Welcome! Please start with a valid session ID.', MIGRANT_BOT_TOKEN);
        return NextResponse.json({}, { status: 200 });
      }

      await sendMessage(chatId, `👋 You joined session: ${sessionUid}`, MIGRANT_BOT_TOKEN);
      return NextResponse.json({}, { status: 200 });
    }

    await sendMessage(chatId, 'Please use /start to begin.', MIGRANT_BOT_TOKEN);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Migrant bot webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function sendMessage(chatId: number | string, text: string, token: string) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) console.error('Telegram sendMessage error:', data);
  } catch (e) {
    console.error('sendMessage failed:', e);
  }
}
