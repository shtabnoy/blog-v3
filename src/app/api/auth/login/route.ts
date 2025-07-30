import { NextResponse } from 'next/server';

/**
 * Based on https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player
 */

const generateRandomString = function (length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export async function GET() {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;

  if (!spotifyClientId) {
    return NextResponse.json(
      { error: 'Spotify client ID not configured' },
      { status: 500 }
    );
  }

  const scope =
    'streaming \
    user-read-email \
    user-read-private';

  // Use environment variable for redirect URL, fallback to localhost
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'production'
    ? 'https://blog.shtabnoy.com'
    : 'http://localhost:3000';

  const redirectUrl = `${baseUrl}/api/auth/callback`;
  const state = generateRandomString(16);

  const authQueryParams = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope,
    redirect_uri: redirectUrl,
    // state is a randomly generated string to protect against attacks such as cross-site request forgery.
    // although it's not mandatory, it's highly recommend including one.
    state,
  });

  const authUrl =
    'https://accounts.spotify.com/authorize/?' + authQueryParams.toString();

  return NextResponse.redirect(authUrl);
}
