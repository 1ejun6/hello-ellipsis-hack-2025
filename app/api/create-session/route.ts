import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient({
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { description } = body;

  if (!description) {
    return NextResponse.json({ error: 'Missing description' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('language, role')
    .eq('auth_id', user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  if (profile.role !== 'migrant') {
    return NextResponse.json({ error: 'Only migrant role can create sessions' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('live_volunteer_sessions')
    .insert({
      worker_id: user.id,
      language: profile.language,
      description,
      status: 'waiting',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Failed to create session' }, { status: 500 });
  }

  console.log('Session created with UID:', data.uid);

  try {
    await sendTelegramMessage(profile.language, description, data.uid);
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
  }

  return NextResponse.json({ session_uid: data.uid });
}

async function sendTelegramMessage(language: string, description: string, sessionUid: string) {
  const volunteerBotToken = process.env.VOLUNTEER_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const botUsername = process.env.WORKER_BOT_TOKEN || 'MigrantHelperBot';

  if (!volunteerBotToken || !telegramChatId) {
    console.error('Missing TELEGRAM_CHAT_ID or VOLUNTEER_BOT_TOKEN in environment variables');
    return;
  }

  if (!botUsername) {
    console.error('Bot username is not set!');
    return;
  }

  if (!sessionUid || typeof sessionUid !== 'string' || sessionUid.trim() === '') {
    console.error('Invalid session UID:', sessionUid);
    return;
  }

  const startUrl = `https://t.me/${botUsername}?start=${encodeURIComponent(sessionUid)}`;
  console.log('Sending Telegram message with start URL:', startUrl);

  const message = `📢 *New Help Request*\n\n*Language:* ${language}\n*Description:* ${description}\n\n🔗 [Open Bot](${startUrl})`;

  const response = await fetch(`https://api.telegram.org/bot${volunteerBotToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    console.error('Telegram API error:', result);
  }
}
