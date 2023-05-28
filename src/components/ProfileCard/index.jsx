import { Box, Typography } from "@mui/material";

export const ProfileCard = ({ avatarUrl, fullName, email, roles }) => {
  return (
    <>
      <Box>
        <Typography component={'span'}>
          <p> Имя пользователя: {fullName}</p>
          <p> E-mail: {email}</p>
          <p> Роли: {roles}</p>
        </Typography>
      </Box>
    </>
  );
};
