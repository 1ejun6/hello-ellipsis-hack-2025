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
      headers: { 'Content-Type': 'application/json' },
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
    <div className="transition-colors">
      <div className="max-w-xl w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          How can we help you today?
        </h1>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
          Please describe your situation or the assistance you need.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            aria-label="Describe your help request"
            placeholder="Type your request here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={8}
            className="w-full p-4 mb-6 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Request Help
          </button>
        </form>
      </div>
    </div>
  );
}
