import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { BarsOutlined, HomeFilled, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { callData } from "../../Api/CallApi";
import LinkApi from "../../Hook/LinkApi";
import Bgtrongdong from '../../assets/trongdong.png'
import quochuy from '../../assets/quochuy.png'
type Category = {
  id: number;
  name: string;
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogo, setShowLogo] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const lastScrollY = React.useRef(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        setShowLogo(false);
      }
      if (currentScrollY < lastScrollY.current) {
        setShowLogo(true);
      }
      setIsFixed(currentScrollY > 50);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // điều chỉnh endpoint nếu khác
        const res = await callData({ url: LinkApi.Category });
        if (res && res.data && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          // fallback tĩnh nếu cần
          setCategories([
            { id: 1, name: "Thể thao" },
            { id: 2, name: "Công nghệ" },
            { id: 3, name: "Kinh doanh" },
            { id: 4, name: "Giải trí" },
            { id: 5, name: "Đời sống" },
            { id: 7, name: "Thế giới" },
            { id: 8, name: "Giáo dục" },
            { id: 9, name: "Du lịch" },
            { id: 10, name: "Pháp luật" },
            { id: 6, name: "Thời sự" },
          ]);
        }
      } catch (err) {
        console.error("Fetch categories error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onNavigateCategory = (id?: number) => {
    if (!id) {
      navigate("/");
      return;
    }
    navigate(`/category/${id}`);
  };

  const [open, setOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleAction = () => {
    if (accessToken) {
      localStorage.clear();
      closeDrawer();
      navigate("/login");
    } else {
      closeDrawer();
      navigate("/login");
    }
  };
  return (
    <div className="header-wrapper-mobile">
      <div className={`top-menu-header-mobile ${showLogo ? "show" : "hide"}`}
        style={{
          display: 'flex', gap: '20px',
          backgroundColor: "#981b1e",
          backgroundImage: `url(${Bgtrongdong})`,
          backgroundPosition: 'center'
        }}
        onClick={() => navigate("/")}
      >
        <div className="menu-icon" onClick={showDrawer}>
          <BarsOutlined />
        </div>
        <div style={{ display: 'flex', gap: '10px' }} className="logo-mobile">
          <img src={quochuy} alt="Logo" style={{ height: 30 }} />
          <h1 >VNEID NEWS</h1>
        </div>
      </div>

      <div className={`bottom-menu-header-mobile ${isFixed ? "fixed" : ""}`}>
        <div className="menu-scroll-container">
          {/* Home */}
          <Button
            type="text"
            className={`btn-menu-mobile ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => onNavigateCategory(undefined)}
          >
            <HomeFilled />
          </Button>

          {/* Categories from BE */}
          {!loading &&
            categories.map((cat) => {
              const isActive =
                location.pathname === `/category/${cat.id}` ||
                location.pathname.startsWith(`/category/${cat.id}/`);
              return (
                <Button
                  key={cat.id}
                  type="text"
                  className={`btn-menu-mobile ${isActive ? "active" : ""}`}
                  onClick={() => onNavigateCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              );
            })}
        </div>
      </div>
      <Drawer
        placement="bottom"
        onClose={closeDrawer}
        open={open}
        bodyStyle={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: '#981b1e', backgroundImage: `url(${Bgtrongdong})`, backgroundPosition: 'center' }}
        height={100}
        closable={false}
        style={{ borderRadius: '10px 10px 0px 0px' }}
      >
        <div
          onClick={handleAction}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          {accessToken ? (
            <>
              <LogoutOutlined />
              <span style={{fontWeight:'bold'}}>ĐĂNG XUẤT</span>
            </>
          ) : (
            <>
              <LoginOutlined />
              <span style={{fontWeight:'bold'}}>ĐĂNG NHẬP</span>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;