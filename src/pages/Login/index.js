import { useState, useContext } from "react";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { sendRequest } from "~/util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/component/Context/auth.context";
import { toast } from "react-toastify";
import ModalVerify from "../ModalVerify";

const cx = classNames.bind(styles);

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [modalVerify, setModalVerify] = useState(false);

  // const openModal = () => {
  //   setModalVerify(true);
  // };

  const closeModal = () => {
    setModalVerify(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmail = (email) => {
    const regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return regEmail.test(email) ? true : false;
  };

  const handleLogin = async () => {
    if (!email) {
      toast.error("Hãy nhập email");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Email ko đúng định dạng");
      return;
    }

    if (!password) {
      toast.error("Hãy nhập password");
      return;
    }
    const res = await sendRequest({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
      method: "POST",
      body: {
        username: email,
        password,
      },
    });

    if (res && res.statusCode === 201) {
      localStorage.setItem("access_token", res.data.access_token);
      toast.success("Đăng nhập thành công");
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });
      navigate("/");
    } else if (res && res.statusCode === 401) {
      toast.error(res.message);
    } else if (res && res.statusCode === 400) {
      toast.error(res.message);
      setModalVerify(true);
    } else {
      toast.error("Internal server error");
    }
  };
  return (
    <>
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
      <ModalVerify
        modalVerify={modalVerify}
        onClose={closeModal}
        email={email}
      />
    </>
  );
};

export default LoginPage;
