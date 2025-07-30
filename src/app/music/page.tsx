'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SPOTIFY_TRACKS, TRACK_INFO } from '@/lib/spotify-tracks';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

export default function MusicPage() {
  const [token, setToken] = useState<string | null>(null);
  const [player, setPlayer] = useState<SpotifyPlayer | undefined>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const startPlaying = async () => {
    if (!deviceId || !token) return;

    try {
      // Transfer playback to this device
      const transferResponse = await fetch(
        `https://api.spotify.com/v1/me/player`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            device_ids: [deviceId],
            play: true,
          }),
        }
      );

      if (transferResponse.ok) {
        console.log('✅ Playback transferred to web player');
      } else {
        console.error('❌ Failed to transfer playback');
      }
    } catch (error) {
      console.error('❌ Error starting playback:', error);
    }
  };

  const playSpecificTrack = async (trackUri?: string) => {
    if (!deviceId || !token) return;

    try {
      // Use provided track URI or default to Bohemian Rhapsody
      const uriToPlay = trackUri || SPOTIFY_TRACKS.bohemianRhapsody;

      const playResponse = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [uriToPlay],
          }),
        }
      );

      if (playResponse.ok) {
        const trackInfo = TRACK_INFO[uriToPlay];
        console.log(`✅ Playing: ${trackInfo?.name} by ${trackInfo?.artist}`);
      } else {
        console.error('❌ Failed to play specific track');
      }
    } catch (error) {
      console.error('❌ Error playing specific track:', error);
    }
  };

  useEffect(() => {
    const getTokenFromCookie = async () => {
      try {
        const response = await fetch('/api/auth/token');
        if (response.ok) {
          const data = await response.json();
          if (data.access_token) {
            setToken(data.access_token);
          }
        }
      } catch (error) {
        console.error('Failed to get token from cookie:', error);
      }
    };

    getTokenFromCookie();
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('✅ Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('❌ Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error('❌ Initialization Error:', message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('❌ Authentication Error:', message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('❌ Account Error:', message);
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('❌ Playback Error:', message);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
      });

      player.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <div className="container">
        <div className="main-wrapper">
          <h1>Spotify Web Player</h1>
          <a href="/api/auth/login" className="btn-spotify">
            Log in with Spotify
          </a>
        </div>
      </div>
    );
  }

  console.log('url: ', current_track.album.images[0].url);

  return (
    <div className="container">
      <div className="main-wrapper">
        {current_track.album.images[0].url ? (
          <Image
            src={current_track.album.images[0].url}
            alt="Album cover"
            width={300}
            height={300}
            className="now-playing__cover"
          />
        ) : (
          <div className="now-playing__cover-placeholder">
            <span>No track playing</span>
          </div>
        )}

        <div className="now-playing__side">
          <div className="now-playing__name">{current_track.name}</div>
          <div className="now-playing__artist">
            {current_track.artists[0].name}
          </div>
        </div>

        <div className="controls">
          <button
            className="btn-spotify"
            onClick={() => {
              player?.previousTrack();
            }}
          >
            &lt;&lt;
          </button>
          <button
            className="btn-spotify"
            onClick={() => {
              player?.togglePlay();
            }}
          >
            {is_paused ? 'PLAY' : 'PAUSE'}
          </button>
          <button
            className="btn-spotify"
            onClick={() => {
              player?.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>

        {deviceId && (
          <div className="start-playing">
            <button className="btn-spotify" onClick={startPlaying}>
              Start Playing
            </button>
            <div className="track-buttons">
              <button
                className="btn-spotify"
                onClick={() =>
                  playSpecificTrack(SPOTIFY_TRACKS.bohemianRhapsody)
                }
              >
                Bohemian Rhapsody
              </button>
              <button
                className="btn-spotify"
                onClick={() => playSpecificTrack(SPOTIFY_TRACKS.heyJude)}
              >
                Hey Jude
              </button>
              <button
                className="btn-spotify"
                onClick={() => playSpecificTrack(SPOTIFY_TRACKS.billieJean)}
              >
                Billie Jean
              </button>
              <button
                className="btn-spotify"
                onClick={() => playSpecificTrack(SPOTIFY_TRACKS.weWillRockYou)}
              >
                We Will Rock You
              </button>
              <button
                className="btn-spotify"
                onClick={() =>
                  playSpecificTrack(SPOTIFY_TRACKS.dontStopBelievin)
                }
              >
                Don&apos;t Stop Believin&apos;
              </button>
            </div>
            <p className="help-text">
              Click &quot;Start Playing&quot; to transfer playback from another
              Spotify app to this web player, or choose a specific track to play
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
