import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./features/auth/views/Login";
import RegisterView from "./features/auth/views/Register";
import VerifyEmail from "./features/auth/views/VerifyEmail";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginView />}/>
            <Route path="/auth/register" element={<RegisterView />}/>
            <Route path="verify-email/:id" element={<VerifyEmail />}/>
            <Route path="/auth/dashboard" element={<Dashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
