import React, { useEffect, useState } from "react";
import { Skeleton, Card, Empty, Pagination } from "antd";
import { callData } from "../../../../Api/CallApi";
import LinkApi from "../../../../Hook/LinkApi";

interface Video {
    id: number;
    title: string;
    link: string;
}

const DetailVideo: React.FC = () => {
    const [data, setData] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);
    const [fixedBottom, setFixedBottom] = useState(false);
    useEffect(() => {
        const handleScroll = () => setFixedBottom(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const fetchVideos = async (currentPage: number, pageSize: number) => {
        setLoading(true);
        try {
            const res = await callData({
                url: `${LinkApi.LinkYTVideo}?page=${currentPage}&size=${pageSize}`,
            });

            setData(res.data?.data || []);
            setTotal(res.data?.total || 0);
        } catch (err) {
            console.error(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(page, size);
    }, [page, size]);

    const renderSkeleton = () => (
        <div className="video-grid-d">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="video-card-d">
                    <Skeleton.Image active className="video-frame-d" />
                    <Skeleton active paragraph={{ rows: 1 }} title={false} />
                </Card>
            ))}
        </div>
    );

    const renderVideos = () => (
        <div className="video-grid-d">
            {data.map((video) => (
                <div key={video.id} className="video-card-d">
                    <div className="video-frame-d">
                        <iframe
                            src={video.link}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: "3px" }}
                        ></iframe>
                    </div>
                    <h3 className="video-title-d">{video.title}</h3>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ textAlign: "center" }} className={`video-container-d ${fixedBottom ? "header-fixed-padding-videoDetail" : ""}`}>
            <div>
                {loading ? (
                    renderSkeleton()
                ) : data.length === 0 ? (
                    <Empty description="Không có dữ liệu video" />
                ) : (
                    renderVideos()
                )}
            </div>

            <div>
                <Pagination
                    className="custom-pagination"
                    current={page}
                    pageSize={size}
                    total={total}
                    showSizeChanger={false}
                    style={{ marginTop: "20px", textAlign: "center", justifyContent: "end" }}
                    onChange={(p) => setPage(p)}
                />
            </div>
        </div>
    );
};

export default DetailVideo;
