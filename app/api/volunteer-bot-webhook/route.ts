import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VOLUNTEER_BOT_TOKEN = process.env.VOLUNTEER_BOT_TOKEN!;
const MIGRANT_BOT_TOKEN = process.env.MIGRANT_BOT_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.message) return NextResponse.json({}, { status: 200 });

    const chatId = body.message.chat.id;
    const text = body.message.text;
    if (!text) return NextResponse.json({}, { status: 200 });

    const supabase = await createClient();

    if (text.startsWith('/start')) {
      const sessionUid = text.split(' ')[1];
      if (!sessionUid) {
        await sendMessage(chatId, 'Please provide a valid session ID to join the session.', VOLUNTEER_BOT_TOKEN);
        return NextResponse.json({}, { status: 200 });
      }

      // Find session to get migrant_chat_id
      const { data: session, error: sessionError } = await supabase
        .from('live_volunteer_sessions')
        .select('migrant_chat_id')
        .eq('uid', sessionUid)
        .single();

      if (sessionError || !session) {
        await sendMessage(chatId, 'Invalid session ID. Please check the link.', VOLUNTEER_BOT_TOKEN);
        return NextResponse.json({}, { status: 200 });
      }

      // Update volunteer_chat_id and status
      const { error: updateError } = await supabase
        .from('live_volunteer_sessions')
        .update({ volunteer_chat_id: chatId, status: 'active' })
        .eq('uid', sessionUid);

      if (updateError) {
        console.error('Failed to update volunteer_chat_id:', updateError);
        await sendMessage(chatId, 'Error joining session. Please try again later.', VOLUNTEER_BOT_TOKEN);
        return NextResponse.json({}, { status: 500 });
      }

      // Confirm to volunteer
      await sendMessage(chatId, `You joined session: ${sessionUid}. Say hi to the migrant!`, VOLUNTEER_BOT_TOKEN);

      // Notify migrant that volunteer joined
      if (session.migrant_chat_id) {
        await sendMessage(session.migrant_chat_id, 'A volunteer joined your session. You can start chatting!', MIGRANT_BOT_TOKEN);
      }

      return NextResponse.json({}, { status: 200 });
    }

    // Forward messages: Find session where this chatId is migrant or volunteer
    const { data: session, error: findError } = await supabase
      .from('live_volunteer_sessions')
      .select('migrant_chat_id, volunteer_chat_id')
      .or(`migrant_chat_id.eq.${chatId},volunteer_chat_id.eq.${chatId}`)
      .single();

    if (findError || !session) {
      await sendMessage(chatId, 'Session not found. Please join a session with /start <session_id>.', VOLUNTEER_BOT_TOKEN);
      return NextResponse.json({}, { status: 200 });
    }

    // Determine recipient chatId
    const recipientChatId = chatId === session.migrant_chat_id ? session.volunteer_chat_id : session.migrant_chat_id;

    if (!recipientChatId) {
      await sendMessage(chatId, 'The other party has not joined the session yet.', VOLUNTEER_BOT_TOKEN);
      return NextResponse.json({}, { status: 200 });
    }

    // Forward the message
    await sendMessage(recipientChatId, text, chatId === session.migrant_chat_id ? VOLUNTEER_BOT_TOKEN : MIGRANT_BOT_TOKEN);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Volunteer bot webhook error:', error);
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
