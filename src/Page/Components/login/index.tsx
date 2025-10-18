import React, { useState } from "react";
import { notification } from "antd";
import { authLogin } from "../../../Api/AuthHasToken/auth";
import NotificationCustom from "../../../Custom/Notification";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await authLogin({ email, password });

      if (res.status === 200) {
        const data = res.data;
        if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        if (data.email) localStorage.setItem("email", data.email);
        if (data.role) localStorage.setItem("role", data.role);

        setNotificationMessage(res.data.message || "Đăng nhập thành công");
        setOpenNotification(true);

        const prevPage = sessionStorage.getItem("previousPage");
        if (prevPage) {
          sessionStorage.removeItem("previousPage");
          navigate(prevPage);
        } else {
          navigate("/");
        }
      } else {
        setNotificationMessage(res.data?.message || "Đăng nhập thất bại");
        setOpenNotification(true);
      }
    } catch (error: any) {
      setNotificationMessage(error.response?.data?.message || error.message || "Đăng ký thất bại");
      setOpenNotification(true);
    }
  };

  return (
    <div className="banner-wrapper">
      <img src="/1.png" alt="left" className="banner-left" />
      <div className="banner-stack">
        <img src="/2.png" alt="middle" className="banner-full middle-img" />
        <div className="banner-full bottom-img">
          <div className="top-content">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-row"
                style={{ textAlign: 'center', color: 'white', fontSize: '20px', fontWeight: '600' }}>
                Đăng ký tài khoản
              </div>
              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                <span className="login-text">Đăng nhập</span>
              </button>
              <div className="dangKiLink" style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: 'white' }}>Bạn chưa có tài khoản ? <a style={{ color: 'white', textDecoration: 'underline' }} href="/register">Đăng kí</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NotificationCustom
        open={openNotification}
        title="Thông báo"
        description={notificationMessage}
        duration={3}
        onCancel={() => setOpenNotification(false)}
      />
    </div>
  );
};

export default Login;
