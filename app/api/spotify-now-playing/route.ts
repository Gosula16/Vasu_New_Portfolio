import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SpotifyImage = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  external_urls?: {
    spotify?: string;
  };
  album?: {
    name?: string;
    images?: SpotifyImage[];
  };
  artists?: SpotifyArtist[];
};

type SpotifyNowPlayingResponse = {
  is_playing?: boolean;
  item?: SpotifyTrack | null;
};

function missingSpotifyConfig() {
  const missing = [
    ["SPOTIFY_CLIENT_ID", process.env.SPOTIFY_CLIENT_ID],
    ["SPOTIFY_CLIENT_SECRET", process.env.SPOTIFY_CLIENT_SECRET],
    ["SPOTIFY_REFRESH_TOKEN", process.env.SPOTIFY_REFRESH_TOKEN],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return missing;
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return { accessToken: null, error: "Spotify is not fully configured." };
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = (await response.json()) as SpotifyTokenResponse;
  if (!response.ok || !data.access_token) {
    return {
      accessToken: null,
      error: data.error_description ?? data.error ?? "Spotify token refresh failed.",
    };
  }

  return { accessToken: data.access_token, error: null };
}

export async function GET() {
  const missing = missingSpotifyConfig();
  if (missing.length > 0) {
    return NextResponse.json({
      ok: true,
      configured: false,
      missing,
      track: null,
    });
  }

  const { accessToken, error } = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ ok: false, configured: true, error }, { status: 502 });
  }

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204) {
    return NextResponse.json({
      ok: true,
      configured: true,
      isPlaying: false,
      track: null,
    });
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        error: "Unable to fetch current Spotify playback.",
      },
      { status: response.status }
    );
  }

  const data = (await response.json()) as SpotifyNowPlayingResponse;
  const track = data.item;

  return NextResponse.json({
    ok: true,
    configured: true,
    isPlaying: Boolean(data.is_playing),
    track: track
      ? {
          title: track.name,
          artist: track.artists?.map((artist) => artist.name).join(", ") ?? "Unknown artist",
          album: track.album?.name ?? "",
          image: track.album?.images?.[0]?.url ?? null,
          url: track.external_urls?.spotify ?? null,
        }
      : null,
  });
}
