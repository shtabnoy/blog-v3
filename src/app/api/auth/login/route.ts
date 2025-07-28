import { NextResponse } from 'next/server';

export async function GET() {
  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;

  if (!spotify_client_id) {
    return NextResponse.json(
      { error: 'Spotify client ID not configured' },
      { status: 500 }
    );
  }

  const scope = 'streaming user-read-email user-read-private';

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: 'http://127.0.0.1:3000/api/auth/callback',
    state: 'some-state-of-my-choice',
  });

  const authUrl =
    'https://accounts.spotify.com/authorize/?' +
    auth_query_parameters.toString();

  return NextResponse.redirect(authUrl);
}
