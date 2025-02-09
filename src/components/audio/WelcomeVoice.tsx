
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface WelcomeVoiceProps {
  isLoaded: boolean;
  hasStarted: boolean;
}

export const WelcomeVoice = ({ isLoaded, hasStarted }: WelcomeVoiceProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && hasStarted && !isPlaying) {
      const playVoice = async () => {
        try {
          setIsPlaying(true);
          
          console.log('Fetching ElevenLabs API key from Supabase...');
          const { data: secretData, error: secretError } = await supabase
            .from('secrets')
            .select('value')
            .eq('name', 'ELEVENLABS_API_KEY')
            .maybeSingle();

          if (secretError) {
            console.error('Error fetching API key:', secretError);
            throw new Error('Failed to get API key');
          }

          if (!secretData) {
            console.error('No API key found in secrets');
            throw new Error('No API key found');
          }

          const apiKey = secretData.value;
          console.log('API key retrieved successfully');

          const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah voice
          const text = "Hello, I am, NOISAI";
          
          console.log('Making ElevenLabs API request...');
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
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
            throw new Error(`Failed to generate speech: ${errorData.detail?.message || 'Unknown error'}`);
          }

          console.log('Successfully received audio response from ElevenLabs');
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          console.log('Setting up audio element...');
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.volume = 1.0;
            
            // Add audio loading event listener
            audioRef.current.onloadeddata = () => {
              console.log('Audio data loaded successfully');
            };

            // Add canplaythrough event listener
            audioRef.current.oncanplaythrough = () => {
              console.log('Audio can play through');
            };

            console.log('Attempting to play audio...');
            try {
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    console.log('Audio started playing successfully');
                  })
                  .catch((error) => {
                    console.error('Playback error:', error);
                    throw new Error(`Failed to play audio: ${error.message}`);
                  });
              }
            } catch (playError) {
              console.error('Error playing audio:', playError);
              throw new Error('Failed to play audio');
            }
          } else {
            console.error('Audio element reference is null');
            throw new Error('Audio element not found');
          }
        } catch (error) {
          console.error('Error playing welcome voice:', error);
          toast({
            title: "Audio Error",
            description: "Failed to play welcome message. Please check your audio settings and browser permissions.",
            variant: "destructive"
          });
          setIsPlaying(false);
        }
      };

      playVoice();
    }
  }, [isLoaded, hasStarted, isPlaying, toast]);

  return (
    <audio 
      ref={audioRef}
      onEnded={() => {
        console.log('Audio playback ended');
        setIsPlaying(false);
      }}
      onError={(e) => {
        console.error('Audio element error:', e);
        setIsPlaying(false);
      }}
      style={{ display: 'none' }}
      controls // Temporarily add controls for debugging
    />
  );
};
