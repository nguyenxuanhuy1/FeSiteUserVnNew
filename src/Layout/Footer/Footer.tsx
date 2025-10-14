import { FacebookFilled, RightOutlined, TikTokFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1 */}
        <div className="footer-column">
          <h4>Về ModernNews</h4>
          <div className="social-icons">
            <a href="#"><div className="icon"><FacebookFilled /></div></a>
            <a href="#"><div className="icon"><TwitterOutlined /></div></a>
            <a href="#"><div className="icon"><YoutubeFilled /></div></a>
            <a href="#"><div className="icon"><TikTokFilled /></div></a>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="footer-column">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Tin mới nhất</a></li>
            <li><a href="#">Tin nổi bật</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="footer-column">
          <h4>Danh mục</h4>
          <ul>
            <li><a href="#">Thời sự</a></li>
            <li><a href="#">Kinh doanh</a></li>
            <li><a href="#">Công nghệ</a></li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div className="footer-column">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Điều khoản</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
