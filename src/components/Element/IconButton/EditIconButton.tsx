import { Cancel, Edit, Save } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type EditIconButtonProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditIconButton = ({ isEditing, setIsEditing }) => {
  return (
    <>
      {isEditing && (
        <IconButton type="submit" arial-label="save-button">
          <Save color="primary" fontSize="large" />
        </IconButton>
      )}
      <IconButton aria-label="edit-button">
        {isEditing ? (
          <Cancel
            color="warning"
            fontSize="large"
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <Edit onClick={() => setIsEditing(true)} />
        )}
      </IconButton>
    </>
  );
};
