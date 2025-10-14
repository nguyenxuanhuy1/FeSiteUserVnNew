import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { callData } from "../../Api/CallApi";
import LinkApi from "../../Hook/LinkApi";

type Category = {
    id: number;
    name: string;
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bgUrl, setBgUrl] = useState<string>('');
    const [bgColor, setBgColor] = useState<string>('white');

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await callData({ url: LinkApi.Category || '/categories' });
                if (res && res.data && Array.isArray(res.data)) {
                    setCategories(res.data);
                } else {
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

    const visibleCount = 2;
    const visibleCategories = categories.slice(0, visibleCount);
    const hiddenCategories = categories.slice(visibleCount);

    const onNavigateCategory = (id?: number) => {
        if (!id) {
            navigate("/");
            return;
        }
        navigate(`/category/${id}`);
    };

    const hiddenMenu = (
        <Menu>
            {hiddenCategories.map((c) => (
                <Menu.Item style={{
                    fontSize: '20px',
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontWeight: 500,
                }} key={c.id} onClick={() => onNavigateCategory(c.id)}>
                    {c.name}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div
            className="headerDesktop"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                height: 70,
                backgroundColor: bgColor,
                backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background 0.5s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2000,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: 1400,
                    margin: "0 auto",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <h1
                        onClick={() => navigate("/")}
                        style={{
                            fontFamily: "'Quicksand', sans-serif",
                            fontSize: 24,
                            color: "rgb(0, 161, 255)",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        VNEID NEWS
                    </h1>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 24, alignItems: 'center' }}>
                    <Button
                        type="text"
                        onClick={() => onNavigateCategory(undefined)}
                        style={{
                            color: location.pathname === "/" ? "rgb(0, 161, 255)" : "inherit",
                            fontSize: '14px',
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        Trang chủ
                    </Button>

                    {!loading &&
                        visibleCategories.map((cat) => {
                            const isActive =
                                location.pathname === `/category/${cat.id}` ||
                                location.pathname.startsWith(`/category/${cat.id}/`);
                            return (
                                <Button
                                    key={cat.id}
                                    type="text"
                                    onClick={() => onNavigateCategory(cat.id)}
                                    style={{
                                        color: isActive ? "rgb(0, 161, 255)" : "inherit",
                                        fontSize: '14px',
                                        fontFamily: "'Nunito Sans', sans-serif",
                                        fontWeight: 500,
                                    }}
                                >
                                    {cat.name}
                                </Button>
                            );
                        })}

                    {/* {hiddenCategories.length > 0 && (Fsize=24
                        <Dropdown overlay={hiddenMenu} trigger={['click']} overlayStyle={{ zIndex: 9999 }}>
                            <Button type="text" style={{
                                fontSize: '14px',
                                fontFamily: "'Nunito Sans', sans-serif",
                                fontWeight: 500,
                            }}>
                                Xem thêm <DownOutlined />
                            </Button>
                        </Dropdown>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Header;