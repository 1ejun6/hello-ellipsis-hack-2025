"use client";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path to your dropdown-menu.tsx
import { useState } from 'react';


export function Hero() {

  // Speech recognition
  const [translation, setTranslation] = useState<string>("");
  const [text, setText] = useState<string>("");

  function handleOnRecord() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onresult = async function(event) {
    const transcript = event.results[0][0].transcript;
    setText(transcript);

    const results = await fetch('/api/translate', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: transcript,
      language: 'pt-BR'
    })
  }).then(r => r.json());

  setTranslation(results.text);
}

  }


  return (
    
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>

      </div>

      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The right way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>

      <div className="flex flex-col items-center">
      <Image
        src="/test2.png"   // auto-served from /public
        alt="My Logo"
        width={500}
        height={200}
      />
    </div>

    

      {/* Points System NEED TO CHANGE */}
      <div className="flex justify-start gap-2 bg-muted px-4 py-2 rounded-lg shadow">
        <span className="font-semibold">Points:</span>
        <span className="text-primary font-bold">{10}</span>
      </div>

      {/* Choose the theme */}
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 bg-red text-white rounded-md">
          Choose Theme
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Food</DropdownMenuItem>
          <DropdownMenuItem>Hospital</DropdownMenuItem>
          <DropdownMenuItem>Pay Bills</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <p>
        Spoken Text: { text }
      </p>

      <p>
        Translation: { translation }
      </p>

      <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter your native language"
        defaultValue="特別好吃"
        id="nativeLang"
        className="border px-2 py-1 rounded"
      />
    </div>

    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        // placeholder="Enter your native language"
        defaultValue="You can say 'Shiok ah'!"
        id="nameInput"
        className="border px-2 py-1 rounded"
      />
    </div>
      <button onClick={handleOnRecord}>Record</button>

      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      {/* <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The right way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p> */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
