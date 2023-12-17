import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  MenuItemProps,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { VerifiedUser } from "@mui/icons-material";
import { User } from "../types/user.class";
import { Role } from "../types/role.enum";
import { useActivateUser } from "../api/activateUser";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ActivateUserDto } from "../types/activate-user.dto";
import { Controller, useForm } from "react-hook-form";
import { ConfirmationDialog } from "../../../components/Element/Dialog/ConfirmationDialog";

type ActivateUserMenuItemProps = {
  user: User;
} & MenuItemProps;

export const ActivateUserMenuItem = ({
  user,
  onClick,
  ...props
}: ActivateUserMenuItemProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useActivateUser();

  const resolver = classValidatorResolver(ActivateUserDto);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivateUserDto>({
    resolver,
    defaultValues: {
      role: Role.CUSTOMER,
    },
  });

  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const onSubmit = (data: ActivateUserDto) => {
    mutation.mutate({ userId: user.id, dto: data });
  };
  const handleConfirm = () => {
    handleSubmit(onSubmit)();
  };

  if (user.role !== Role.PENDING) {
    return <></>;
  }

  return (
    <>
      <MenuItem
        onClick={handleOpen}
        disableRipple
        color="primary.main"
        {...props}
      >
        <VerifiedUser color="primary" />
        <Typography color="primary" ml={1}>
          有効化する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"activate-user"}
        open={open}
        title={"ユーザーを有効化しますか？"}
        contentText={"有効化すると、ユーザーはWebサイトにログインできます"}
        content={
          (
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>アカウントタイプ</FormLabel>
                  <RadioGroup row name="radio-buttons-group" {...field}>
                    <FormControlLabel
                      value={Role.CUSTOMER}
                      control={<Radio />}
                      label="保護者"
                    />
                    <FormControlLabel
                      value={Role.TEACHER}
                      control={<Radio />}
                      label="講師"
                    />
                    <FormHelperText error={!!errors.role}>
                      {errors.role?.message}
                    </FormHelperText>
                  </RadioGroup>
                </>
              )}
            />
          ) as any
        }
        cancelText="キャンセル"
        confirmText="有効化する"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
