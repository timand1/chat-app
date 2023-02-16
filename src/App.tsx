import Home from "./views/home/home";
import Login from "./views/login/login";
import Register from "./views/register/register";
import Errorpage from "./views/errorpage/errorpage";
import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Errorpage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;