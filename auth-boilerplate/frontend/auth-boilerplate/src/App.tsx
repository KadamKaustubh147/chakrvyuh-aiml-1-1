import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import NewPass from "./pages/NewPass";
import Activation from "./pages/Activation";
import { AuthProvider } from "./context/AuthContext-http-jwt";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./pages/PrivateRoute";

const RootLayout = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen scroll-smooth">
        {/* This is your outlet for child routes */}
        <Outlet />
      </div>
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/activation/:uid/:token" element={<Activation />} />
      <Route path="password/reset/confirm/:uid/:token" element={<PasswordReset />} />
      <Route path="/newpass" element={<NewPass />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;