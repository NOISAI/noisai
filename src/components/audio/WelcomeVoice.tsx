
import { useEffect, useRef, useState } from 'react';

interface WelcomeVoiceProps {
  isLoaded: boolean;
  hasStarted: boolean;
}

export const WelcomeVoice = ({ isLoaded, hasStarted }: WelcomeVoiceProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isLoaded && hasStarted && !isPlaying) {
      const playVoice = async () => {
        try {
          setIsPlaying(true);
          const apiKey = process.env.ELEVENLABS_API_KEY;
          const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah voice
          const text = "Hello, I am, NOISAI";
          
          const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': apiKey!,
            },
            body: JSON.stringify({
              text: text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              }
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate speech');
          }

          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            await audioRef.current.play();
          }
        } catch (error) {
          console.error('Error playing welcome voice:', error);
        }
      };

      playVoice();
    }
  }, [isLoaded, hasStarted, isPlaying]);

  return (
    <audio 
      ref={audioRef}
      onEnded={() => setIsPlaying(false)}
      style={{ display: 'none' }}
    />
  );
};
