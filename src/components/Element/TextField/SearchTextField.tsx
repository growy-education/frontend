import { FC, forwardRef } from "react";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchTextField: FC<TextFieldProps> = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      placeholder="検索"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
});
