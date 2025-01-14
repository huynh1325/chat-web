import { useEffect, useContext, useState } from "react";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/component/Context/auth.context";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import avtFb from "~/assets/avt_fb.jpg";
import { faArrowDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { WebsocketContext } from "~/component/Socket/WebsocketContext";

const cx = classNames.bind(styles);

const HomePage = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.info("Hãy đăng nhập");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear("access_token");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
      },
    });
    toast.info("Đăng xuất thành công");
    navigate("/login");
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.on('onMessage', (newMessage) => {
      console.log('onMessage event received!');
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []);

  const onSubmit = () => {
    socket.emit('newMessage', value);
    setValue('');
  };

  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("notification")}>
          <FontAwesomeIcon icon={faBell} className={cx("notification-icon")} />
        </div>
        <div className={cx("avatar")}>
          <img src={avtFb} alt="avt" />
        </div>
        <div className={cx("account")}>
          <div className={cx("username")}>
            <span className={cx("username-text")}>Admin</span>
            <span className={cx("username-icon")}>
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </div>
        </div>
        {/* <button onClick={handleLogout}>Đăng xuất</button> */}
      </header>
      <div className={cx("content")}>
        <div className={cx("list-chat")}>
          <div className={cx("list-header")}>Danh sách chat</div>
          <ul className={cx("list-content")}>
            <li className={cx("list-item")}>
              <div className={cx("avatar")}>
                <img alt="avatar" src={avtFb} />
              </div>
              <div className={cx("list-item-info")}>
                <span className={cx("name")}>
                  Nguyễn Hà Huynh
                </span>
                <span className={cx("message")}>
                  spamle text here
                </span>
              </div>
              <span className={cx("time")}>
                1h
              </span>
            </li>
            <li className={cx("list-item")}>
              <div className={cx("avatar")}>
                <img alt="avatar" src={avtFb} />
              </div>
              <div className={cx("list-item-info")}>
                <span className={cx("name")}>
                  Nguyễn Hà Huynh
                </span>
                <span className={cx("message")}>
                  spamle text here
                </span>
              </div>
              <span className={cx("time")}>
                1h
              </span>
            </li>
            <li className={cx("list-item")}>
              <div className={cx("avatar")}>
                <img alt="avatar" src={avtFb} />
              </div>
              <div className={cx("list-item-info")}>
                <span className={cx("name")}>
                  Nguyễn Hà Huynh
                </span>
                <span className={cx("message")}>
                  spamle text here
                </span>
              </div>
              <span className={cx("time")}>
                1h
              </span>
            </li>
            <li className={cx("list-item")}>
              <div className={cx("avatar")}>
                <img alt="avatar" src={avtFb} />
              </div>
              <div className={cx("list-item-info")}>
                <span className={cx("name")}>
                  Nguyễn Hà Huynh
                </span>
                <span className={cx("message")}>
                  spamle text here
                </span>
              </div>
              <span className={cx("time")}>
                1h
              </span>
            </li>
            <li className={cx("list-item")}>
              <div className={cx("avatar")}>
                <img alt="avatar" src={avtFb} />
              </div>
              <div className={cx("list-item-info")}>
                <span className={cx("name")}>
                  Nguyễn Hà Huynh
                </span>
                <span className={cx("message")}>
                  spamle text here
                </span>
              </div>
              <span className={cx("time")}>
                1h
              </span>
            </li>
          </ul>
        </div>
        <div className={cx("chat-content")}>
          <div className={cx("chat-header")}>
            <img alt="avatar" src={avtFb}/>
            <div className={cx("name")}>Nguyễn Hà Huynh</div>
            <span><FontAwesomeIcon icon={faEllipsis} className={cx("icon")} /></span>
          </div>
          <div className={cx("chat-body")}>
            <div className={cx("chat")}>
              {messages.length === 0 ? (
                <div>No Messages</div>
              ) : (
                <div>
                  {messages.map((msg) => (
                    <div>
                      <p>{msg.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={cx("send-input")}>
              <input
                type="text"
                placeholder="Nhập tin nhắn" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={onSubmit}>Gửi</button>
            </div>
          </div>
        </div>
        <div className={cx("profile-info")}>
          info
        </div>
      </div>
    </div>
  );
};

export default HomePage;
