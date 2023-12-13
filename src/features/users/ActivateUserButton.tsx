import { LockOpen } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { User } from "./types/user.class";
import { Role } from "./types/role.enum";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";
import { useState } from "react";
import { useActivateUser } from "./api/activateUser";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ActivateUserDto } from "./types/activate-user.dto";
import { Controller, useForm } from "react-hook-form";

type ActivateUserButtonProps = {
  user: User;
};

export const ActivateUserButton = ({ user }: ActivateUserButtonProps) => {
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
      <Button
        variant="outlined"
        endIcon={<LockOpen />}
        onClick={handleOpen}
        disabled={mutation.isPending}
      >
        {user.role !== Role.PENDING
          ? "ユーザーは有効です"
          : "ユーザーを有効にする"}
      </Button>
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
        cancelText="ログアウトしない"
        confirmText="ログアウトする"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
