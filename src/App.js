import "./App.css";
import {Header} from "./components/Header/Header";
import Footer from "./components/Footer/footer";

import { Home, AddDish, FullDish, Login, Registration } from "./pages";

import { Routes, Route } from "react-router-dom";

import Container from "@mui/material/Container";


function App() {
  return (
    <div className="App">
      <Header/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dishes:id" element={<FullDish />}></Route>
          <Route path="/add-dish" element={<AddDish />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
        </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
