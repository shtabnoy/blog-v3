# Spotify Player Setup

This project includes a Spotify Web Player implementation. Follow these steps to set it up:

## Prerequisites

1. **Spotify Premium Account**: The Web Playback SDK requires Spotify Premium
2. **Spotify Developer Account**: You need to create an app in the Spotify Developer Dashboard

## Setup Instructions

### 1. Create a Spotify App

1. Go to [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Log in with your Spotify credentials
3. Click "Create an App"
4. Provide a name and description for your app
5. Accept the terms and conditions
6. Click "Create"

### 2. Configure Your App

1. In your app dashboard, note down your **Client ID** and **Client Secret**
2. Click "Edit Settings"
3. Add `http://127.0.0.1:3000/api/auth/callback` to the **Redirect URIs**
4. Save the changes

### 3. Environment Variables

Create a `.env` file in the root directory with your Spotify credentials:

```env
SPOTIFY_CLIENT_ID='your_spotify_client_id_here'
SPOTIFY_CLIENT_SECRET='your_spotify_client_secret_here'
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Application

Start the Next.js development server:

```bash
npm run dev
```

### 6. Access the Player

1. Open your browser and go to `http://127.0.0.1:3000/music`
2. Click "Log in with Spotify"
3. Authorize the application
4. You should see the Spotify player interface

### 7. Start Playing Music

**Option 1: Transfer from Another Spotify App**
1. Open Spotify on your phone, computer, or any other device
2. Start playing any track
3. In your web player, click the "Start Playing" button
4. The playback will transfer to your web player

**Option 2: Use Spotify Connect**
1. In any Spotify app, look for the "Connect" button (speaker icon)
2. Select your "Web Playback SDK" device
3. Start playing music - it will play in your web browser

**Option 3: Use the Web Player Controls**
- Once playback is active, use the play/pause, previous, and next buttons
- The player will show the current track information and album cover

**Option 4: Play Specific Hardcoded Tracks**
- Click any of the track buttons (Bohemian Rhapsody, Hey Jude, etc.)
- The selected track will start playing immediately
- You can easily add more tracks by editing `src/lib/spotify-tracks.ts`

## Features

- **Playback Controls**: Play/pause, previous, next track
- **Track Information**: Displays current track name, artist, and album cover
- **Real-time Updates**: Automatically updates when track changes
- **Modern UI**: Beautiful gradient background with glassmorphism effects

## Troubleshooting

- Make sure you have a Spotify Premium account
- Ensure the Next.js development server is running on port 3000
- Check that your redirect URI is correctly configured in the Spotify Developer Dashboard
- Verify your environment variables are set correctly

## Next Steps

You can extend this player with additional features like:
- Volume control
- Playlist management
- Search functionality
- Queue management
- Device switching 