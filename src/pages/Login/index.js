import { useState, useContext } from "react";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { loginApi } from "~/util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/component/Context/auth.context";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmail = (email) => {
    const regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return regEmail.test(email) ? true : false;
  };

  const handleLogin = async () => {
    // setObjValidInput(defaultObjValidInput);

    if (!email) {
      // setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Hãy nhập email");

      return;
    }

    if (!isEmail(email)) {
      toast.error("Email ko đúng định dạng");
      return;
    }

    if (!password) {
      // setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Hãy nhập password");
      return;
    }

    let res = await loginApi(email, password);

    if (res && +res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      toast.success("Đăng nhập thành công");
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });
      navigate("/");
    }

    if (res && +res.EC !== 0) {
      // error
      toast.error(res.EM);
    }
  };

  return (
    <div className={cx("login")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("heading")}>
            <h2>Đăng nhập</h2>
          </div>
          <div className={cx("input")}>
            <input
              placeholder="Email"
              type="text"
              className={cx("input-email")}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className={cx("input")}>
            <input
              placeholder="Mật khẩu"
              type="password"
              className={cx("input-password")}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className={cx("password-action")}>
            <div className={cx("back-home")}>
              <a href="/">Quay lại trang chủ</a>
            </div>
            <a href="/" className={cx("forgot-password")}>
              Quên mật khẩu
            </a>
          </div>
          <button className={cx("login-btn")} onClick={handleLogin}>
            Đăng nhập
          </button>
          <div className={cx("register-text")}>
            Bạn chưa có tài khoản? <a href="/register">Tạo tài khoản</a> ngay
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
