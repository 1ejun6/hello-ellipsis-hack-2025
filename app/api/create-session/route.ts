import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  // IMPORTANT: pass cookies to supabase client for auth session
  const supabase = await createClient({
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  console.log('User fetch result:', { user, userError });

  if (userError || !user) {
    console.error('Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { description } = body;

  if (!description) {
    console.error('Missing description in request body');
    return NextResponse.json({ error: 'Missing description' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('language, role')
    .eq('auth_id', user.id)
    .single();

  console.log('Profile fetch result:', { profile, profileError, userId: user.id });

  if (profileError || !profile) {
    console.error(`Profile not found for user id: ${user.id}`, profileError);
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  if (profile.role !== 'migrant') {
    console.error(`User role is '${profile.role}', only 'migrant' can create sessions.`);
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

  if (error) {
    console.error('Error inserting session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Session created with UID:', data.uid);

  return NextResponse.json({ session_uid: data.uid });
}
