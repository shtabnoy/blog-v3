// Spotify Track URIs - you can change these to any tracks you want to play
export const SPOTIFY_TRACKS = {
  // Queen - Bohemian Rhapsody
  bohemianRhapsody: 'spotify:track:3z8h0TU7ReDPLIbEnYhWZb',

  // The Beatles - Hey Jude
  heyJude: 'spotify:track:0aym2LBJBk9DAYuHHutrIl',

  // Michael Jackson - Billie Jean
  billieJean: 'spotify:track:5ChkMS8OtdzJeqyybCc9R5',

  // Queen - We Will Rock You
  weWillRockYou: 'spotify:track:54flyrjcdnQdco7300avMJ',

  // Journey - Don't Stop Believin'
  dontStopBelievin: 'spotify:track:4bHsxqR3GMrXTxEPLuK5ue',

  // AC/DC - Back In Black
  backInBlack: 'spotify:track:08mG3Y1vljYA6bvDt4Wqkj',

  // Pink Floyd - Another Brick in the Wall
  anotherBrickInTheWall: 'spotify:track:5mpA4W4N0IYd74VZJ3wXCs',

  // Led Zeppelin - Stairway to Heaven
  stairwayToHeaven: 'spotify:track:5CQ30WqJwcep0pYcV4AMNc',

  // The Rolling Stones - Paint It Black
  paintItBlack: 'spotify:track:63T7DJ1AFDD6Bn8VzG6JE8',

  // Eagles - Hotel California
  hotelCalifornia: 'spotify:track:40riOy7x9W7GXjyGp4pjAv',
};

// Default track to play
export const DEFAULT_TRACK = SPOTIFY_TRACKS.bohemianRhapsody;

// Track information for display
export const TRACK_INFO = {
  [SPOTIFY_TRACKS.bohemianRhapsody]: {
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
  },
  [SPOTIFY_TRACKS.heyJude]: {
    name: 'Hey Jude',
    artist: 'The Beatles',
    album: 'The Beatles 1967-1970',
  },
  [SPOTIFY_TRACKS.billieJean]: {
    name: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
  },
  [SPOTIFY_TRACKS.weWillRockYou]: {
    name: 'We Will Rock You',
    artist: 'Queen',
    album: 'News of the World',
  },
  [SPOTIFY_TRACKS.dontStopBelievin]: {
    name: "Don't Stop Believin'",
    artist: 'Journey',
    album: 'Escape',
  },
  [SPOTIFY_TRACKS.backInBlack]: {
    name: 'Back In Black',
    artist: 'AC/DC',
    album: 'Back In Black',
  },
  [SPOTIFY_TRACKS.anotherBrickInTheWall]: {
    name: 'Another Brick in the Wall, Pt. 2',
    artist: 'Pink Floyd',
    album: 'The Wall',
  },
  [SPOTIFY_TRACKS.stairwayToHeaven]: {
    name: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
  },
  [SPOTIFY_TRACKS.paintItBlack]: {
    name: 'Paint It Black',
    artist: 'The Rolling Stones',
    album: 'Aftermath',
  },
  [SPOTIFY_TRACKS.hotelCalifornia]: {
    name: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
  },
};
