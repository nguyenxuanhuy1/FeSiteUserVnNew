import { FacebookFilled, PhoneFilled, PhoneOutlined, TikTokFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";
import Bgtrongdong from '../../assets/trongdong.png';
import quochuy from '../../assets/quochuy.png';
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer" style={{
      backgroundColor: "#981b1e",
      backgroundImage: `url(${Bgtrongdong})`,
      backgroundPosition: 'center'
    }}>
      <div className="footer-container">

        <div className="footer-column">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }} onClick={() => navigate("/")}>
            <img src={quochuy} alt="Logo" style={{ height: 50 }} />
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61574576751253"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <FacebookFilled />
              </div>
            </a>

            <a
              href="https://www.youtube.com/@VNeIDSupport"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <YoutubeFilled style={{ color: 'red' }} />
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@vneid.support"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <TikTokFilled style={{ color: 'black' }} />
              </div>
            </a>

          </div>
        </div>

        <div className="footer-column">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Tin mới nhất</a></li>
            <li><a href="#">Tin nổi bật</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Danh mục</h4>
          <ul>
            <li><a href="#">Thời sự</a></li>
            <li><a href="#">Kinh doanh</a></li>
            <li><a href="#">Công nghệ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="tel:19000368"><PhoneOutlined/> 19000368</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
