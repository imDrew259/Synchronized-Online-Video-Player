import { useState , useEffect} from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";

const App =() => {

  const [currUser, setCurrUser] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={currUser ? <JoinRoom currUser={currUser} setCurrUser={setCurrUser}/>: <Navigate replace to="/login"/>} />
      <Route path="/login" element={currUser ? <Navigate replace to="/"/> : <Login currUser={currUser} setCurrUser={setCurrUser}/>} />
      <Route path="/register" element={currUser ? <Navigate replace to="/"/> : <Register currUser={currUser} setCurrUser={setCurrUser}/>} />
      <Route path="*" element={"Page not found"} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
