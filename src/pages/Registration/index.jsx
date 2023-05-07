import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchRegister } from "../../redux/slices/auth";

export const Registration = () => {
  /**Флаг того, что user авторизован */
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  /**Подключение react-формы */
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  /**Выполняется п корректной валидации в react form
   * @param values значения react-form
   */
  const onSubmit = async (values) => {
    /**Получение action и получение информации, авторизован user или нет */
    const data = await dispatch(fetchRegister(values));
    console.log(data);

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться, попробуйте позже.");
    }

    if ("token" in data.payload) {
      /**Использование localStorage браузера для хранения user токена */
      window.localStorage.setItem("token", data.payload.token);
    } 
  };

  /**Переадресация на главную страницу после успешной авторизации */
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Создание аккаунта</Typography>
        <div>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          label="Полное имя"
          type="fullName"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
          fullWidth
        />
        <TextField
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите e-mail" })}
          fullWidth
        />
        <TextField
          label="Пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
