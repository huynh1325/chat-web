import { useState } from "react";
import styles from "./register.module.scss";
import classNames from "classnames/bind";
import { createUserApi } from "~/util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isEmail = (email) => {
    const regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return regEmail.test(email) ? true : false;
  };

  const handleRegister = async () => {
    if (!email) {
      toast.error("Hãy nhập email");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Email ko đúng định dạng");
      return;
    }

    // if (!name) {
    //   toast.error("Hãy nhập name");
    //   return;
    // }

    if (!password) {
      toast.error("Hãy nhập password");
      return;
    }

    const res = await createUserApi(email, password, name);
    console.log("res: ", res);

    if (res && +res.EC === 0) {
      toast.success("Đăng ký thành công");
      navigate("/");
    } else {
      if (res && +res.EC === 1) {
        toast.error("Email đã tồn tại");
      } else {
        toast.error("Đăng ký thất bại");
      }
    }
  };

  return (
    <div className={cx("login")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("heading")}>
            <h2>Đăng ký</h2>
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
          <div className={cx("input")}>
            <input
              placeholder="Name"
              type="text"
              className={cx("input-email")}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className={cx("password-action")}>
            <div className={cx("remember-password")}>
              <input type="checkbox" />
              <span>Nhớ mật khẩu</span>
            </div>
            <a href="/" className={cx("forgot-password")}>
              Quên mật khẩu
            </a>
          </div>
          <button className={cx("login-btn")} onClick={handleRegister}>
            Đăng ký
          </button>
          <div className={cx("register-text")}>
            Đã có tài khoản? <a href="/login">Đăng nhập!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
