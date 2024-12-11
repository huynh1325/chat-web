import { useState } from "react";
import styles from "./verify.module.scss";
import classNames from "classnames/bind";
import { sendRequest } from "~/util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const VerifyPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const { id } = useParams();

  const handleVerify = async () => {
    if (!code) {
      toast.error("Hãy nhập mã");
      return;
    }

    const res = await sendRequest({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        _id: id,
        code,
      },
    });
    console.log("res: ", res);
    if (res?.data) {
      toast.success("Xác minh thành công");
      navigate("/login");
    } else {
      toast.error("error sth");
    }
  };
  return (
    <div className={cx("login")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("heading")}>
            <h2>Xác thực</h2>
          </div>
          <div className={cx("input")}>
            <input
              placeholder="Nhập mã"
              type="text"
              className={cx("input-email")}
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
              }}
            />
          </div>
          <button className={cx("login-btn")} onClick={handleVerify}>
            Xác thực
          </button>
          {/* <div className={cx("register-text")}>
          Đã có tài khoản? <a href="/login">Đăng nhập!</a>
        </div> */}
        </div>
      </div>
    </div>
  );
};
export default VerifyPage;
