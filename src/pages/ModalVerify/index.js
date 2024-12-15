import classNames from "classnames/bind";
import styles from "./modalVerify.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { sendRequest } from "~/util/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ModalVerify = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");

  if (!props.modalVerify) return null;

  const closeModal = () => {
    props.onClose();
    setCode("");
  };

  const handleSendCode = async () => {
    const email = props.email;
    const res = await sendRequest({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/retry-active`,
      method: "POST",
      body: {
        email,
      },
    });

    if (res?.data) {
      setUserId(res?.data?._id);
      toast.info("Mã đã được gửi");
    } else {
      toast.error(res.message);
    }
  };

  const handleConfirm = async () => {
    const res = await sendRequest({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        _id: userId,
        code,
      },
    });

    if (res?.data) {
      toast.success("Xác minh thành công");
      props.onClose();
      navigate("/");
    } else {
      toast.error("error");
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("header")}>
            <h3>Kích hoạt tài khoản</h3>
            <FontAwesomeIcon
              icon={faXmark}
              className={cx("close-icon")}
              onClick={closeModal}
            />
          </div>
          <div className={cx("send-code")}>
            <input
              placeholder="Nhập mã xác thực"
              type="text"
              value={code}
              className={cx("input-code")}
              onChange={(event) => {
                setCode(event.target.value);
              }}
            />
            <button className={cx("btn-send-code")} onClick={handleSendCode}>
              Lấy mã
            </button>
          </div>
          <button className={cx("btn-confirm")} onClick={handleConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalVerify;
