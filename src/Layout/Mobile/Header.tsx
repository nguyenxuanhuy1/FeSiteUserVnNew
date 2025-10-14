import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { callData } from "../../Api/CallApi";
import LinkApi from "../../Hook/LinkApi";

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

  return (
    <div className="header-wrapper-mobile">
      <div className={`top-menu-header-mobile ${showLogo ? "show" : "hide"}`}>
        <h1 onClick={() => navigate("/")}>VNEID NEWS</h1>
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
    </div>
  );
};

export default Header;