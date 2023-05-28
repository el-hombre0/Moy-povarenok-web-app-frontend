import React from "react";
import { ProfileCard } from "../../components";
import axios from "../../axios";
import { Typography, Paper } from "@mui/material";
import { List, ListItem } from "@material-ui/core";
export const UserProfile = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [usersList, setUsersList] = React.useState();

  React.useEffect(() => {
    axios
      .get(`/auth/me`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении информации о пользователе!");
      });

    axios
      .get(`/profile/users`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении информации о пользователях!");
      });
  }, []);
  const isAdmin = data ? data.roles.indexOf("ADMIN", 0) !== -1 : null;

  return (
    <>
      <Paper>
        <Typography component={"span"}>
          <h3>Ваши данные:</h3>
          <>
            {data ? (
              <ProfileCard
                fullName={data.fullName}
                email={data.email}
                roles={data.roles}
              />
            ) : null}
          </>
          <h3 hidden={!isAdmin}>Пользователи:</h3>
          <List>
            {isAdmin &&
              (usersList
                ? usersList.users.map((user) => (
                    <>
                      <ListItem>
                        <ProfileCard
                          fullName={user.fullName}
                          email={user.email}
                          roles={user.roles}
                        />
                      </ListItem>
                    </>
                  ))
                : null)}
          </List>
        </Typography>
      </Paper>
    </>
  );
};
