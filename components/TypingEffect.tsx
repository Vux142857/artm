import React, { useState, useEffect } from 'react';
import '../styles/TypingEffect.css';

interface TypingEffectProps {
  text: string
}

const TypingEffect: React.FC<TypingEffectProps> = (typingProps: TypingEffectProps) => {
  const textToType = typingProps.text
  const [displayedText, setDisplayedText] = useState(textToType[0]);
  let index = 1;

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => prevText + textToType[index]);
      index++;
      if (index === textToType.length - 1) {
        clearInterval(typingInterval);
      }
    }, 500); // Thời gian delay giữa mỗi ký tự, có thể điều chỉnh

    return () => {
      clearInterval(typingInterval);
    };
  }, [textToType]);

  return (
    <div className="typing-effect-container">
      <span>{displayedText}</span>
    </div>
  );
};

export default TypingEffect;
