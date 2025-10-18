import { useParams } from "react-router-dom";
import { callData } from "../../../../Api/CallApi";
import LinkApi from "../../../../Hook/LinkApi";
import { useEffect, useState } from "react";
import { getTimeAgo } from "../../tinhTime";
import { ClockCircleOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Post } from "../interface";
import CardRela from "../../../Components/Card/CardRela/CardRela";
import { Button, Skeleton, Spin } from "antd";
import { Input } from "antd";
import ModalSection from "../../../../Custom/Modal";
import { useNavigate } from "react-router-dom";
import { guiBinhLuan } from "../../../../Api/AuthHasToken/auth";
import NotificationCustom from "../../../../Custom/Notification";
import Avatar from "antd/es/avatar/Avatar";
const { TextArea } = Input;
interface Detail {
    id: number;
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    tags: string[];
}

const CardDetails = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [data, setData] = useState<Detail | null>(null);
    const [loading, setLoading] = useState(false);
    const [fixedBottom, setFixedBottom] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [binhLuan, setBinhLuan] = useState([]);
    useEffect(() => {
        const handleScroll = () => setFixedBottom(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchDetail = async () => {
        try {
            setLoading(true);
            const res = await callData({
                url: `${LinkApi.Detail}${slug}`,
            });
            setData(res.data);
            if (res.data?.id) {
                setTimeout(() => {
                    fetchBinhLuan(res.data.id);
                }, 1000);
            }
        } catch (error) {
            console.error("Lỗi khi tải chi tiết:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBinhLuan = async (id: number | string) => {
        try {
            const resBL = await callData({
                url: `${LinkApi.LayBinhLuan}${id}`,
            });
            setBinhLuan(resBL.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        if (slug) fetchDetail();
    }, [slug]);


    const [dataRela, setDataRela] = useState<Post[]>([]);
    useEffect(() => {
        const fetchRela = async () => {
            if (!data?.tags || data.tags.length === 0) return;
            setLoading(true);
            try {
                const tagString = data.tags.join(",");
                const res = await callData({
                    url: `${LinkApi.Rela}tags=${tagString}&page=1&size=6`,
                });
                setDataRela(res.data.data);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        };
        fetchRela();
    }, [data?.tags]);

    const token = localStorage.getItem("accessToken");
    const [openModal, setOpenModal] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [comment, setComment] = useState("");
    const handleComment = async (id: number) => {
        if (!comment.trim()) {
            setNotificationMessage("Bình luận không được để trống!");
            setOpenNotification(true);
            return;
        }
        setLoading1(true);
        try {
            const res = await guiBinhLuan(id, { content: comment });
            if (res.status === 200 || res.status === 201) {
                fetchBinhLuan(id);
                setComment("");
            } else {
                setNotificationMessage(res.data?.message || "Gửi bình luận thất bại.");
                setOpenNotification(true);
            }
        } catch (error: any) {
            setNotificationMessage(error.response?.data?.error || error.error || "Gửi bình luận thất bại.");
            setOpenNotification(true);
        } finally {
            setLoading1(false);
        }
    };



    if (loading) return <div className="detail">
        <Skeleton.Input active style={{ width: 250, height: 32, marginBottom: 20 }} />
        <Skeleton active paragraph={{ rows: 8 }} />
        <Skeleton.Image active style={{ width: "100%", height: 300, borderRadius: 8 }} />
        <Skeleton.Input active style={{ width: 150, marginTop: 10 }} />
    </div>
    if (!data) return null;
    const { title, content, updatedAt, id, views } = data;


    return (
        <div className="detail">
            <div
                className={`view-card ${fixedBottom ? "header-fixed-padding-detail" : ""}`}
            >
                <h2 className="view-card-title">{title}</h2>
                <div
                    className="view-card-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="view-card-image-wrap" style={{ display: 'flex', gap: '20px' }}>
                    <span className="view-card-time">
                        <EyeOutlined /> {views} luợt xem
                    </span>
                    <span className="view-card-time">
                        <ClockCircleOutlined /> {getTimeAgo(updatedAt)}
                    </span>
                </div>
                <div>
                    <div>
                        <div className="section-header-tinmoinhat" style={{ background: 'none', margin: '5px 0px' }}>
                            <div className="label">BÌNH LUẬN</div>
                        </div>
                        <div className="binhLuan">
                            <TextArea
                                rows={1}
                                placeholder="Viết bình luận..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                maxLength={500}
                            />
                            <Button
                                className="btn-submit-binhluan"
                                onClick={() => {
                                    if (token) {
                                        handleComment(id);
                                    } else {
                                        setOpenModal(true);
                                    }
                                }}
                                loading={loading1 ? true : false}
                            >
                                Đăng
                            </Button>

                        </div>
                    </div>
                    <div className="ds-binhluan">
                        {binhLuan.length > 0 ? (
                            binhLuan.map((item: any) => (
                                <div key={item.id} className="item-binhluan">
                                    <Avatar
                                        size={40}
                                        icon={<UserOutlined />}
                                        className="avatar-binhluan"
                                    />
                                    <div className="noi-dung-binhluan">
                                        <div className="thongtin-binhluan">
                                            <p className="ten-tacgia">{item.author}</p>
                                            <p className="thoigian-binhluan">{getTimeAgo(item.createdAt)}</p>
                                        </div>
                                        <p className="noidung-binhluan">{item.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="chuacobinhluan">Chưa có bình luận nào.</p>
                        )}
                    </div>

                </div>
            </div>
            <div>
                <br />
                <CardRela posts={dataRela} loading={loading} />
            </div>

            <ModalSection
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Thông báo"
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        backgroundColor: "#fff5f5",
                        padding: "12px 16px",
                        border: "1px solid #f0dada",
                        borderRadius: "2px",
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "15px",
                            color: "#333",
                            fontWeight: 500,
                        }}
                    >
                        Bạn cần đăng nhập để bình luận!
                    </p>

                    <button
                        style={{
                            backgroundColor: "#981b1e",
                            color: "#fff",
                            border: "none",
                            borderRadius: "2px",
                            padding: "6px 14px",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            height: "38px",
                        }}
                        onClick={() => {
                            sessionStorage.setItem("previousPage", window.location.pathname);
                            navigate("/login");
                        }}
                    >
                        Đăng nhập
                    </button>
                </div>

            </ModalSection>
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

export default CardDetails;
