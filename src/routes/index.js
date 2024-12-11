import HomePage from "~/pages/Home";
import LoginPage from "~/pages/Login";
import RegisterPage from "~/pages/Register";
import VerifyPage from "~/pages/Verify";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/verify/:id", component: VerifyPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
