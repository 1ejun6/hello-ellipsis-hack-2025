'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveVolunteerPage() {
  const [description, setDescription] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch('/api/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ description }),
    });

    const data = await res.json();

    if (res.ok) {
      const tgBotUsername = process.env.NEXT_PUBLIC_WORKER_BOT || 'MigrantHelperBot';
      const startUrl = `https://t.me/${tgBotUsername}?start=${data.session_uid}`;
      router.push(startUrl);
    } else {
      alert(data.error || 'Failed to create session');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={6}
        placeholder="Describe your help request"
        className="w-full p-4 border rounded"
      />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Request Help
      </button>
    </form>
  );
}
