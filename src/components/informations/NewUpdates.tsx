import { ArrowRight, Check } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

export const NewUpdates = () => {
  return (
    <>
      <Box display="flex" mb={1}>
        <ArrowRight sx={{ color: "primary.main", display: "flex" }} />
        <Typography
          color="primary.main"
          variant="body1"
          textAlign="left"
          sx={{ color: "primary.main", textDecoration: "underline" }}
        >
          質問回答がWebサイトで利用可能に
        </Typography>
      </Box>
      <>
        <Box mb={1}>
          <Typography textAlign="left">
            　βテストの段階から好評だった質問回答なのですが、
            生徒・保護者の皆様からの不満の声もありました。
          </Typography>
        </Box>
        <Box ml={0.5} mr={0.5} mb={1}>
          <Box display="flex" m={0.1}>
            <Check fontSize="small" />
            <Typography textAlign="left">
              質問画像と回答動画を一緒に見たい
            </Typography>
          </Box>
          <Box display="flex" m={0.1}>
            <Check fontSize="small" />
            <Typography textAlign="left">今までの質問を一覧で見たい</Typography>
          </Box>
          <Box display="flex" m={0.1}>
            <Check fontSize="small" />
            <Typography textAlign="left">
              質問を編集・キャンセルができない
            </Typography>
          </Box>
        </Box>
        <Box mb={1}>
          <Typography textAlign="left">
            　これらの声に応えるために、私たちはWebサイトにログイン機能を導入し、
            質問回答サービスをGoogleフォームから移行することに決定しました。
          </Typography>
        </Box>
        <Box display="flex" mb={1}>
          <ArrowRight sx={{ color: "primary.main", display: "flex" }} />
          <Typography
            color="primary.main"
            variant="body1"
            textAlign="left"
            sx={{ color: "primary.main", textDecoration: "underline" }}
          >
            今後のWebサイトへの機能について
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography textAlign="left">
            　今回のWeb版質問回答が好評であれば、
            オンライン自習室や過去問・模試動画添削などの各種サービスも
            少しずつWebサイトへと機能を拡充していくつもりです。
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography textAlign="left">
            Webサイトについて何か意見・感想等あれば、
            GoogleChatでスタッフまでお伝えください。
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography textAlign="left">
            　これからも個別指導塾Growyをよろしくお願いいたします。
          </Typography>
        </Box>
      </>
    </>
  );
};
