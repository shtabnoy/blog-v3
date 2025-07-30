declare global {
  interface SpotifyPlayerConfig {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
    volume?: number;
  }
  interface SpotifyTrack {
    name: string;
    album: {
      images: Array<{ url: string }>;
    };
    artists: Array<{ name: string }>;
  }

  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (config: SpotifyPlayerConfig) => SpotifyPlayer;
    };
  }

  interface SpotifyPlayer {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(
      event: string,
      callback: (data: {
        device_id: string;
        message: string;
        track_window: { current_track: SpotifyTrack };
        paused: boolean;
      }) => void
    ): void;
    removeListener(event: string): void;
    getCurrentState(): Promise<unknown>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<number>;
    setVolume(volume: number): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    togglePlay(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
    activateElement(): Promise<void>;
  }
}

export {};
