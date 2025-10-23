// TextToSpeech.tsx
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis không được hỗ trợ trên môi trường này.");
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập văn bản"
      />
      <Button onClick={() => handleSpeak()}>Speak</Button>
    </div>
  );
};

export default TextToSpeech;
