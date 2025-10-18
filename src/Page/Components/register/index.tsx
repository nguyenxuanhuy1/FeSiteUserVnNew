import React, { useState } from "react";
import { authRegister } from "../../../Api/AuthHasToken/auth";
import NotificationCustom from "../../../Custom/Notification";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const usernameRegex = /^[\x00-\x7F]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fullName.length > 50) {
      setNotificationMessage("Họ và tên không được vượt quá 50 ký tự");
      setOpenNotification(true);
      return;
    }

    if (email.length > 20) {
      setNotificationMessage("Tài khoản (email) không được vượt quá 20 ký tự");
      setOpenNotification(true);
      return;
    }

    if (!usernameRegex.test(email)) {
      setNotificationMessage("Tài khoản không được chứa dấu cách hoặc ký tự tiếng Việt");
      setOpenNotification(true);
      return;
    }

    if (password.length > 20) {
      setNotificationMessage("Mật khẩu không được vượt quá 20 ký tự");
      setOpenNotification(true);
      return;
    }

    if (!usernameRegex.test(password)) {
      setNotificationMessage("Mật khẩu không được chứa dấu cách hoặc ký tự tiếng Việt");
      setOpenNotification(true);
      return;
    }

    try {
      const res = await authRegister({ email, password, fullName });

      if (res.status === 200) {
        setNotificationMessage(res.data.message || "Đăng ký thành công");
        setOpenNotification(true);
        window.location.href = "/login";
      } else {
        setNotificationMessage(res.data?.message || "Đăng ký thất bại");
        setOpenNotification(true);
      }
    } catch (error: any) {
      setNotificationMessage(
        error.response?.data?.message || error.message || "Đăng ký thất bại"
      );
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
              <div
                className="form-row"
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Đăng ký tài khoản
              </div>

              {/* Họ và tên */}
              <div className="form-row">
                <label htmlFor="fullName" className="form-label">
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder="Nhập họ và tên"
                  required
                  maxLength={50}
                />
              </div>

              {/* Email */}
              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  Tài khoản
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Nhập tài khoản"
                  required
                  maxLength={50}
                />
              </div>

              {/* Mật khẩu */}
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
                  maxLength={20}
                />
              </div>

              {/* Nút đăng ký */}
              <button type="submit" className="login-button">
                <span className="login-text">Đăng ký</span>
              </button>

              {/* Link đăng nhập */}
              <div
                className="dangKiLink"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ color: "white" }}>
                  Bạn đã có tài khoản?{" "}
                  <a
                    style={{ color: "white", textDecoration: "underline" }}
                    href="/login"
                  >
                    Đăng nhập
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Notification */}
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

export default Register;
