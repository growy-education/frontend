import { Box, Typography } from "@mui/material";
import { PointBox } from "../components/PointBox";
import { PointImageBox } from "../components/PointImageBox";
import { PointTypography } from "../components/PointTypography";
import { ImageBox } from "../components/ImageBox";
import { ContentBox } from "../components/ContentBox";
import { WhiteBox } from "../components/WhiteBox";
import {
  CoachingTypography,
  TeachingPointTypography,
  TeachingTypography,
} from "../components/Typography";
import { DescriptionBox } from "../components/DescriptionBox";
import { CheckmarkImage } from "../components/CheckmarkImage";
import { CheckmarkBox } from "../components/CheckmarkBox";
import { CheckmarkImageBox } from "../components/CheckmarkImageBox";

export const Teaching = () => {
  return (
    <>
      <Box
        component="section"
        id="teaching"
        style={{
          backgroundImage: "url(./img/bg-teaching.jpg)",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      >
        <PointBox>
          <PointImageBox>
            <img
              src="/img/point2-min.png"
              alt="ポイント2"
              style={{ width: "4rem" }}
            />
          </PointImageBox>
          <PointTypography>ティーチング</PointTypography>
        </PointBox>

        <Box p={2}>
          <ImageBox>
            <img
              src="/img/teaching-top-img-min.png"
              alt="優れた指導能力を持つティーチング講師が..."
              style={{ width: "100%" }}
            />
          </ImageBox>

          <ContentBox>
            <WhiteBox>
              <Box>
                <img
                  src="/img/number-teaching-1-min.png"
                  alt="1"
                  style={{ width: "5.5rem" }}
                />
                <TeachingPointTypography>
                  オンライン指導
                </TeachingPointTypography>
                <DescriptionBox>
                  <Typography>
                    科目ごとのプロフェッショナル講師から分かりやすい個別指導を受けられるサービスです。
                  </Typography>
                </DescriptionBox>

                <Box>
                  <ImageBox>
                    <img
                      src="/img/img-teaching-1-min.png"
                      alt="オンライン授業"
                      style={{ width: "100%" }}
                    />
                  </ImageBox>

                  <DescriptionBox>
                    <CheckmarkBox mb={1}>
                      <CheckmarkImageBox>
                        <CheckmarkImage />
                      </CheckmarkImageBox>
                      <Box>
                        <Typography textAlign={"left"}>
                          <CoachingTypography>
                            コーチング担当の講師
                          </CoachingTypography>
                          が「学習スケジュール」で指定した学習内容を学びます。
                        </Typography>
                      </Box>
                    </CheckmarkBox>
                    <CheckmarkBox>
                      <CheckmarkImageBox>
                        <CheckmarkImage />
                      </CheckmarkImageBox>
                      <Box>
                        <Typography textAlign={"left"}>
                          １コマ80分の短い時間で集中的に１つの科目を学びます。
                        </Typography>
                      </Box>
                    </CheckmarkBox>
                    <CheckmarkBox>
                      <CheckmarkImageBox>
                        <CheckmarkImage />
                      </CheckmarkImageBox>
                      <Box>
                        <Typography textAlign={"left"}>
                          授業はGoogleMeetを使って
                          <TeachingTypography>
                            ティーチング担当の講師
                          </TeachingTypography>
                          の画面を共有しながら行われます。
                        </Typography>
                      </Box>
                    </CheckmarkBox>
                  </DescriptionBox>
                </Box>

                <ImageBox>
                  <img
                    src="/img/teaching-comment-1-sp-min.png"
                    alt="ティーチングコメント１"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
                <Typography
                  sx={{
                    marginTop: "2rem",
                    lineHeight: "1.8rem",
                    padding: "0 1rem",
                  }}
                >
                  ※キャンセルのご連絡は前日までにお願いいたします。当日の場合はキャンセル料が発生する場合がございます。
                </Typography>
              </Box>

              <Box>
                <img
                  src="/img/number-teaching-2-min.png"
                  alt="2"
                  style={{ width: "5.5rem" }}
                />
                <TeachingPointTypography>
                  質問回答サービス
                </TeachingPointTypography>
                <DescriptionBox>
                  <Typography>
                    分からない問題を24時間質問することができるサービスです。
                  </Typography>
                </DescriptionBox>
                <ImageBox mt={3}>
                  <img
                    src="/img/img-teaching-2-min.png"
                    alt="質問回答サービス図解"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
                <DescriptionBox>
                  <Typography>
                    算数や理科などの分からない問題につまずいた時は、問題の写真をフォームに送ると解説動画が届きます。
                  </Typography>
                  <Typography>
                    ※回答動画はGrowyの各科目担当講師が作成します。
                  </Typography>
                </DescriptionBox>
                <ImageBox>
                  <img
                    src="/img/teaching-comment-2-sp-min.png"
                    alt="ティーチングコメント2"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
              </Box>

              <Box>
                <img
                  src="/img/number-teaching-3-min.png"
                  alt="3"
                  style={{ width: "5.5rem" }}
                />
                <TeachingPointTypography>
                  オンライン自習室
                </TeachingPointTypography>

                <DescriptionBox>
                  <Typography>
                    オンラインの自習室で集中した学習環境が得られるサービスです。
                  </Typography>
                </DescriptionBox>

                <ImageBox>
                  <img
                    src="/img/img-teaching-3-min.png"
                    alt="オンライン自習室"
                    style={{ width: "50%" }}
                  />
                </ImageBox>

                <ImageBox>
                  <img
                    src="/img/teaching-comment-3-sp-min.png"
                    alt="ティーチングコメント3"
                    style={{ width: "100%" }}
                  />
                </ImageBox>

                <DescriptionBox>
                  <Typography
                    sx={{
                      lineHeight: "1.9rem",
                      margin: "0 auto",
                      padding: "0 1.5rem",
                      textAlign: "left",
                    }}
                  >
                    ※運営の都合で開催できない日もございます
                    <br />
                    ※他の生徒様の集中の妨げにならないようにするため、自習室では質問をお受けしておりません。
                  </Typography>
                </DescriptionBox>
              </Box>
            </WhiteBox>
          </ContentBox>
        </Box>
      </Box>
    </>
  );
};
