import { IsUrl, isURL } from "class-validator";
import { getYouTubeIdFromUrl } from "./get-youtube-id-from-url";

/**
 *
 * @param url ユーザーが入力したURL。
 * @returns 埋め込み用のURLか""を返す
 */
export const getEmbedYouTubePath = (url: string): string => {
  let youtubeId: string;
  if (isURL(url)) {
    youtubeId = getYouTubeIdFromUrl(url);
  } else {
    youtubeId = url;
  }
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=0`;
  } else {
    return "";
  }
};
