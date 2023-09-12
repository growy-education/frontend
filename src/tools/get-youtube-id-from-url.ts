export const getYouTubeIdFromUrl = (url: string): string => {
  // YouTube URL から動画 ID を抜き出すための正規表現
  // 以下の形式に対応
  /*
  [
    "https://www.youtube.com/watch?v=12345678901",
    "https://youtu.be/12345678901",
    "https://youtu.be/12345678901?t=6",
    "https://m.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1",
    "https://www.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1&rv=smKgVuS",
    "https://www.youtube.com/watch?v=12345678901&list=RD12345678901&start_radio=1&rv=12345678901&t=38",
    "https://youtube.com/shorts/12345678901",
    "https://www.youtube.comaa/watch?v=12345678901",
  ]
  */

  const youtubePatterns =
    /^(https?:\/\/(www\.)?(m\.)?youtube\.com(\/watch\?v=|\/shorts\/)|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})(\?t=\d+)?(&.+)?$/;

  // 正規表現にマッチする部分を抜き出す
  const match = url.match(youtubePatterns);

  if (match) {
    return match[5];
  } else {
    return null;
  }
};
