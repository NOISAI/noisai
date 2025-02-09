
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
          
          // Get the API key from Supabase secrets
          const { data: secretData, error: secretError } = await supabase
            .from('secrets')
            .select('value')
            .eq('name', 'ELEVENLABS_API_KEY')
            .single();

          if (secretError || !secretData) {
            throw new Error('Failed to get API key');
          }

          const apiKey = secretData.value;
          const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah voice
          const text = "Hello, I am, NOISAI";
          
          console.log('Making ElevenLabs API request...');
          const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': apiKey,
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
            const errorData = await response.json();
            console.error('ElevenLabs API error:', errorData);
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
