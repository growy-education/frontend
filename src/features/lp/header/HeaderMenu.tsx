import { Close, Instagram, Twitter, YouTube } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { HeaderListTypography } from "./HeaderListTypography";
import { HeaderIconButton } from "./HeaderIconButton";

type HeaderMenuProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderMenu = ({ setOpen }: HeaderMenuProps) => {
  return (
    <Box
      sx={{
        background: "transparent",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        mt={1}
        mr={5}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "end",
          justifyContent: "flex-end",
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={() => setOpen(false)}>
          <Close fontSize="large" />
        </IconButton>
      </Box>

      <Grid container maxWidth="500px" color="white">
        <Grid item pl={4} xs={7}>
          <List>
            <ListItem>
              <HeaderListTypography href="#">TOP</HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#message">
                メッセージ
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#about">
                個別指導塾Growyとは
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#coaching">
                コーチング
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#teaching">
                ティーチング
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#teachers">
                講師紹介
              </HeaderListTypography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={5}>
          <List>
            <ListItem>
              <HeaderListTypography href="#students">
                対象の生徒
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#voice">
                保護者様の声
              </HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#price">料金</HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#faq">FAQ</HeaderListTypography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <HeaderListTypography href="#message-2">
                代表より
              </HeaderListTypography>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={9}
          pl={5}
          pr={5}
          pb={2}
          sx={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <HeaderIconButton href="https://www.youtube.com/channel/UC35PZPRvt3OBQ10dYj2k61w">
            <YouTube fontSize="large" />
          </HeaderIconButton>

          <HeaderIconButton href="https://twitter.com/honnedechuju">
            <Twitter fontSize="large" />
          </HeaderIconButton>
          <HeaderIconButton href="https://www.instagram.com/honnechuju/">
            <Instagram fontSize="large" />
          </HeaderIconButton>

          <HeaderIconButton href="https://honnedechuju.com/">
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              BLOG
            </Typography>
          </HeaderIconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
