// import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};
  const classes = useStyles();

  return (
      <AppBar position="relative" color="default">
        <Container maxWidth="lg">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButtom}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" >Трактир "По пути"</Link></Typography>
              <Box m={10}>
                  {isAuth ? (
                    <>
                      <Link to="/dishes/create">
                        <Button color="primary" variant="contained">Добавить блюдо</Button>
                      </Link>
                        <Button color="secondary" variant="contained" onClick={onClickLogout}>Выйти</Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button color="primary" variant="outlined">Войти</Button>
                      </Link>
                      <Link to="/register">
                        <Button color="secondary" variant="contained">Зарегистрироваться</Button>
                      </Link>
                    </>
                  )}
              </Box>
            </Toolbar>
        </Container>
      </AppBar>
  );
};
