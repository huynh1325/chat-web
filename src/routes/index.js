import HomePage from "~/pages/Home";
import LoginPage from "~/pages/Login";
import RegisterPage from "~/pages/Register";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
