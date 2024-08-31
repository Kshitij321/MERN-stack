import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const {user}=useAuthContext();
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ?<Home/>:<Navigate to='/login'></Navigate>}></Route>
            <Route path="/login" element={!user?<Login/>:<Navigate to='/'></Navigate>}></Route>
            <Route path="/signup" element={!user?<Signup/>:<Navigate to='/'></Navigate>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
