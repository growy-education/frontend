import { getYouTubeIdFromUrl } from "./get-youtube-id-from-url";

/**
 *
 * @param url ユーザーが入力したURL。
 * @returns 埋め込み用のURLか""を返す
 */
export const getEmbedYouTubePath = (url: string): string => {
  const youtubeId = getYouTubeIdFromUrl(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  } else {
    return "";
  }
};
