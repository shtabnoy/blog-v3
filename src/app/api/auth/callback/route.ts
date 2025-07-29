import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!spotifyClientId || !spotifyClientSecret) {
    return NextResponse.json(
      { error: 'Spotify credentials not configured' },
      { status: 500 }
    );
  }

  // Exchange authorization code for access token (according to Spotify OAuth 2.0 approach)
  try {
    const tokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString(
              'base64'
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: 'http://localhost:3000/api/auth/callback',
          grant_type: 'authorization_code',
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Redirect to the music page with the access token
    return NextResponse.redirect(
      `http://localhost:3000/music?access_token=${accessToken}`
    );
  } catch (error) {
    // Log detailed error information for debugging
    if (error instanceof Error) {
      console.error('Token exchange error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    } else {
      console.error('Token exchange error (unknown type):', error);
    }

    return NextResponse.json(
      { error: 'Failed to authenticate with Spotify' },
      { status: 500 }
    );
  }
}
