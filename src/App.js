import "./App.css";
import React from "react";
import { Header, Footer } from "./components/";
import { Home, AddDish, FullDish, Login, Registration } from "./pages";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  
  /**Флаг, авторизован ли user */
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dishes/:id" element={<FullDish />}></Route>
          <Route path="/add-dish" element={<AddDish />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
