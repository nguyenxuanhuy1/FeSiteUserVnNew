import { useParams } from "react-router-dom";
import { callData } from "../../../../Api/CallApi";
import LinkApi from "../../../../Hook/LinkApi";
import { useEffect, useState } from "react";
import ErrorCard from "../../../../Components/Err/ErrCallData";
import { getTimeAgo } from "../../tinhTime";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Post } from "../interface";
import CardRela from "../../../Components/Card/CardRela/CardRela";
import { Skeleton } from "antd";
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
    const { slug } = useParams();
    const [data, setData] = useState<Detail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fixedBottom, setFixedBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => setFixedBottom(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await callData({
                    url: `${LinkApi.Detail}${slug}`,
                });
                    setData(res.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
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
                    url: `${LinkApi.Rela}tags=${tagString}&page=1&size=5`,
                });
                setDataRela(res.data.data);
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false);
            }
        };
        fetchRela();
    }, [data?.tags]);

    if (loading) return <div className="detail">
        <Skeleton.Input active style={{ width: 250, height: 32, marginBottom: 20 }} />
        <Skeleton active paragraph={{ rows: 8 }} />
        <Skeleton.Image active style={{ width: "100%", height: 300, borderRadius: 8 }} />
        <Skeleton.Input active style={{ width: 150, marginTop: 10 }} />
    </div>
    if (error) return <ErrorCard />;
    if (!data) return null;

    const { title, content, updatedAt } = data;

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
                <div className="view-card-image-wrap">
                    <span className="view-card-time">
                        <ClockCircleOutlined /> {getTimeAgo(updatedAt)}
                    </span>
                </div>
            </div>
            <div>
                <br />
                <CardRela posts={dataRela} loading={loading} />
            </div>
        </div>
    );
};

export default CardDetails;
