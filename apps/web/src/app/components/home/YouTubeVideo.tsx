'use client';

import { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  autoplay?: boolean;
  start?: number;
}

export function YouTubeVideo({ videoId, autoplay = false, start = 0 }: YouTubeVideoProps) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: autoplay ? 1 : 0,
      mute: 1, // Start muted for autoplay reliability
      controls: 0, // Hide YouTube controls – we'll use custom ones
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: videoId,
      start: start,
    },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setPlayerReady(true);
    if (autoplay) {
      event.target.playVideo();
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(50);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/5">
      {/* YouTube Player */}
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />

      {/* Custom Controls – Overlay at the bottom */}
      {playerReady && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-primary-400 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={toggleMute}
            className="text-white hover:text-primary-400 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <span className="text-white/60 text-xs ml-auto">
            {isMuted ? '🔇 Muted' : '🔊 Sound On'}
          </span>
        </div>
      )}
    </div>
  );
}
