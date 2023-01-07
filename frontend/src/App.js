import './App.css';
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import People from "./pages/People/People";
import Call from "./pages/Call/Call";

import { ContextProvider } from "./contexts/socketContext";

function App() {

  return <>

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route exact path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

        <Route exact path="/people" element={
          <ProtectedRoute>
            <ContextProvider>
              <People />
            </ContextProvider>
          </ProtectedRoute>} />

        <Route exact path="/call/:from/:to/:init" element={
          <ProtectedRoute>
            <ContextProvider>
              <Call />
            </ContextProvider>
          </ProtectedRoute>} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  </>

}



const GuestRoute = ({ children }) => {
  const isAuth = JSON.parse(sessionStorage.getItem("user")) || false;
  if (isAuth) {
    return (
      <Navigate to="/" />
    )
  } else {
    return (
      children
    )
  }
}

const ProtectedRoute = ({ children }) => {
  const isAuth = JSON.parse(sessionStorage.getItem("user")) || false;
  if (isAuth) {
    return (
      children
    )
  } else {
    return (
      <Navigate to="/" />
    )
  }
}

export default App;
