import { Cancel, Edit, Save } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type EditIconButtonProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditIconButton = ({
  isEditing,
  setIsEditing,
}: EditIconButtonProps) => {
  return (
    <>
      {isEditing && (
        <IconButton type="submit" arial-label="save-button">
          <Save color="primary" fontSize="large" />
        </IconButton>
      )}
      <Tooltip title="編集する">
        <IconButton
          aria-label="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <Cancel color="warning" fontSize="large" /> : <Edit />}
        </IconButton>
      </Tooltip>
    </>
  );
};
