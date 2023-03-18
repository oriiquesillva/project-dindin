import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SingUp"
import Main from "./pages/Main"
import { getItem } from "./utils/storage";

function ProtectedRoutes({redirecTo}){
  const token = getItem("token")

  return token ? <Outlet/> : <Navigate to={redirecTo}/>
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route element={<ProtectedRoutes redirecTo="/"/>}>
      <Route path="/home" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
