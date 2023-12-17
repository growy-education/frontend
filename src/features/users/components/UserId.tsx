import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";

type UserIdProps = {
  id: string;
};

export const UserId = ({ id }: UserIdProps) => {
  return (
    <>
      <HeadlineTypography>ユーザーID</HeadlineTypography>
      <DetailTypography>{id}</DetailTypography>
    </>
  );
};
