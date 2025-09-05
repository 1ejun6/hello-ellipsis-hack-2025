"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path to your dropdown-menu.tsx
import { useState } from 'react';

export function Translation() {

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

      <div className="flex flex-col items-center">
      <Image
        src="/teaching-mascot.png" 
        alt="My Logo"
        width={500}
        height={200}
      />

      {/* Points System NEED TO CHANGE */}
      <div className="flex justify-start gap-2 bg-muted px-4 py-2 rounded-lg shadow">
        <span className="font-semibold">Points:</span>
        <span className="text-primary font-bold">{10}</span>
      </div>

      {/* Choose the theme */}
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 bg-red-500 text-white rounded-md">
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
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
    
  );
}
