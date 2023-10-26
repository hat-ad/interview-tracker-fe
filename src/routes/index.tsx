import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../features/auth/register/Screen/register";
import Login from "../features/auth/login/Screen/login";
import Home from "../features/home/Screen/home";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import NotFound from "../features/notFound/Screens";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
