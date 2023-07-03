import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate } from "react-router-dom";

export const Login = () => {
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
    const data = await dispatch(fetchAuth(values));

    if (!data.payload){
      return alert("Не удалось авторизоваться, попробуйте позже.");
    }
    
    if ("token" in data.payload) {
      /**Использование localStorage браузера для хранения user токена */
      window.localStorage.setItem("token", data.payload.token);
    };
  };

  // React.useEffect();

  /**Переадресация на главную страницу после успешной авторизации */
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper>
      <Typography component={'span'} variant="h5">Вход в аккаунт</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button type="submit" disabled={!isValid} size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
