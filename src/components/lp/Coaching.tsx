import { Box, Typography } from "@mui/material";
import { PointBox } from "./components/PointBox";
import {
  BoldTypography,
  CoachingPointTypography,
} from "./components/Typography";
import { PointImageBox } from "./components/PointImageBox";
import { PointTypography } from "./components/PointTypography";
import { ContentBox } from "./components/ContentBox";
import { WhiteBox } from "./components/WhiteBox";
import { ImageBox } from "./components/ImageBox";
import { DescriptionBox } from "./components/DescriptionBox";
import { CheckmarkBox } from "./components/CheckmarkBox";
import { CheckmarkImageBox } from "./components/CheckmarkImageBox";
import { CheckmarkImage } from "./components/CheckmarkImage";

export const Coaching = () => {
  return (
    <>
      <Box
        component="section"
        id="coaching"
        style={{
          backgroundImage: "url(./img/bg-coaching.jpg)",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          width: "100%",
        }}
      >
        <PointBox>
          <PointImageBox>
            <img
              src="/img/point1-min.png"
              alt="ポイント１"
              style={{ width: "4rem" }}
            />
          </PointImageBox>
          <PointTypography>コーチング</PointTypography>
        </PointBox>

        <Box p={2}>
          <ImageBox>
            <img
              src="/img/coaching-top-img-min.png"
              alt="経験豊富な講師が専属サポーターとして..."
              style={{ width: "100%" }}
            />
          </ImageBox>

          <ContentBox>
            <WhiteBox>
              <Box>
                <img
                  className="number"
                  src="/img/number-coaching-1-min.png"
                  alt="1"
                />
                <CoachingPointTypography>
                  高品質なスケジュール管理
                </CoachingPointTypography>
                <DescriptionBox>
                  <Typography>
                    面談や成績を踏まえて、お子様の学習スケジュールを講師が
                    <BoldTypography>毎週作成</BoldTypography>。
                    <br />
                    進捗の管理を<BoldTypography>毎日</BoldTypography>
                    行います。
                  </Typography>
                </DescriptionBox>

                <Box>
                  {/* スケジュール表の例 */}
                  <ImageBox>
                    <img
                      src="/img/img-schedule-list-min.jpg"
                      alt="スケジュール表"
                      style={{ width: "100%" }}
                    />
                  </ImageBox>

                  {/* チェックマークと説明 */}
                  <DescriptionBox>
                    <CheckmarkBox mb={1}>
                      <CheckmarkImageBox mr={1}>
                        <CheckmarkImage />
                      </CheckmarkImageBox>
                      <Box>
                        <Typography textAlign={"left"}>
                          その日の学習内容と教材を具体的に指定します。
                        </Typography>
                      </Box>
                    </CheckmarkBox>

                    <CheckmarkBox>
                      <CheckmarkImageBox>
                        <CheckmarkImage />
                      </CheckmarkImageBox>
                      <Box>
                        <Typography textAlign={"left"}>
                          <BoldTypography>
                            お子様の性格や学習状況に合わせて学習内容を取捨選択できる
                          </BoldTypography>
                          ので、効率的に学習を進められるようになります。
                        </Typography>
                      </Box>
                    </CheckmarkBox>
                  </DescriptionBox>
                </Box>

                <ImageBox>
                  <img
                    className="img-coaching-1"
                    src="/img/coaching-comment-1-sp-min.png"
                    alt="コーチングコメント１"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
              </Box>

              <Box>
                <img
                  className="number"
                  src="/img/number-coaching-2-min.png"
                  alt="2"
                />
                <CoachingPointTypography>
                  いつでも対応可能な
                  <br />
                  学習相談
                </CoachingPointTypography>
                <DescriptionBox>
                  <Typography>
                    中学受験の悩みをチャットやビデオ通話で
                    <BoldTypography>いつでも</BoldTypography>
                    相談することができます。
                  </Typography>
                </DescriptionBox>
                <ImageBox mt={3}>
                  <img
                    src="/img/img-coaching-2-min.png"
                    alt="チャットやビデオで相談"
                    style={{ width: "100%" }}
                  />
                </ImageBox>

                <ImageBox>
                  <img
                    className="img-coaching-2"
                    src="/img/coating-comment-2-sp-min.png"
                    alt="コーチングコメント2"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
              </Box>

              <Box>
                <img
                  style={{ width: "5.5rem" }}
                  src="/img/number-coaching-3-min.png"
                  alt="3"
                />
                <CoachingPointTypography>
                  毎週のオンライン面談
                </CoachingPointTypography>

                <DescriptionBox>
                  <Typography>
                    お子様の学習状況や日々のお悩みについて講師と話し合うことができます。
                  </Typography>
                </DescriptionBox>
                <ImageBox>
                  <img
                    src="/img/img-coaching-3-min.png"
                    alt="ミーティング"
                    style={{ width: "100%" }}
                  />
                </ImageBox>

                <ImageBox>
                  <img
                    src="/img/coaching-comment-3-sp-min.png"
                    alt="コーチングコメント3"
                    style={{ width: "100%" }}
                  />
                </ImageBox>
              </Box>
            </WhiteBox>
          </ContentBox>
        </Box>
      </Box>
    </>
  );
};
