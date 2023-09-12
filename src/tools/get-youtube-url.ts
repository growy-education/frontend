import { getYouTubeIdFromUrl } from "./get-youtube-id-from-url";

export const getYoutubeUrl = (url: string): string => {
  const youtubeId = getYouTubeIdFromUrl(url);
  if (youtubeId) {
    return `https://www.youtube.com/watch?v=${youtubeId}`;
  } else {
    return null;
  }
};
