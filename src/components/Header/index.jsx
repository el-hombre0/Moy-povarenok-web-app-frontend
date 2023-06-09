// import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
    }
    window.localStorage.removeItem("token");
  };

  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="md">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButtom}
          >
            <MenuIcon />
          </IconButton>
          <Typography component={'span'} variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Мой Поварёнок</Link>
          </Typography>
          <Box m={2}>
            {isAuth ? (
              <>
              <Link to="/profile">
                <IconButton>
                  <AccountCircleIcon/>
                </IconButton>
              </Link>
                <Link to="/add-dish">
                  <Button color="primary" variant="contained">
                    Добавить блюдо
                  </Button>
                </Link>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onClickLogout}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button color="primary" variant="outlined">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button color="secondary" variant="contained">
                    Зарегистрироваться
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
