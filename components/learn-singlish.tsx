"use client";
import Image from "next/image";
import { useState } from "react";

// Declare types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function Translation() {
  const [translation, setTranslation] = useState<string>("");
  const [text, setText] = useState<string>("");

  function handleOnRecord() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.start();

    recognition.onresult = async function (event: any) {
      const transcript = event.results[0][0].transcript;
      setText(transcript);

      const results = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: transcript,
          language: "pt-BR",
        }),
      }).then((r) => r.json());

      setTranslation(results.text);
    };
  }

  return (
    <div className="flex flex-col items-center">
      <Image src="/teaching-mascot.png" alt="Mascot" width={500} height={200} />
      <div className="bg-gray-500 p-4 rounded-lg w-full">Spoken Text: {text}</div>
      <div className="bg-gray-500 p-4 rounded-lg w-full">Translation: {translation}</div>
      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleOnRecord}>
        Record
      </button>
    </div>
  );
}
