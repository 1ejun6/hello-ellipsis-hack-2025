"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path to your dropdown-menu.tsx
import { useState } from 'react';

export function ThemeSelection(){
  return(
  <div className="flex justify-between items-center w-full max-w-5xl p-5">
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

        {/* Points System NEED TO CHANGE */}
        <div className="flex justify-start gap-2 bg-muted px-4 py-2 rounded-lg shadow">
          <span className="font-semibold">Points:</span>
          <span className="text-primary font-bold">{10}</span>
        </div>
      </div>
  )
} 

export function Translation() {

  // Speech recognition
  const [translation, setTranslation] = useState<string>("");
  const [text, setText] = useState<string>("");

  function handleOnRecord() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang="zh-CN"; // Changes according to language of user
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

      <div className="bg=gray-500 p-4 rounded-lg w-full">
        <p>
         Spoken Text: { text }
        </p>
      </div>

      <div className="bg=gray-500 p-4 rounded-lg w-full">
        <p>
          Translation: { translation }
        </p>
      </div>

      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleOnRecord}>Record</button>
    </div>
    
  );
}
