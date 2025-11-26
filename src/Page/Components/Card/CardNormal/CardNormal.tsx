import { Divider, Empty, Pagination, Skeleton } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { PostCoTotal } from '../interface';
import { getTimeAgo } from '../../tinhTime';
import { useNavigate } from "react-router-dom";

const CardNormal: React.FC<PostCoTotal> = ({
    data,
    loading,
}) => {
    const navigate = useNavigate();
    const GetSlug = (slug: String) => {
        navigate(`/bai-viet/${slug}`);
    };
    const hasItems = Array.isArray(data) && data.length > 0;

    if (loading) {
        return (
            <div className="card-normal">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="card-skeleton-nm">
                        <Skeleton.Image style={{ width: 200, height: 120 }} active />
                        <div style={{ flex: 1 }}>
                            <Skeleton active paragraph={{ rows: 2 }} title />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="card-normal">
                {hasItems ? (
                    data.map((item) => (
                        <div key={item.id} onClick={() => GetSlug(item.slug)}>
                            <div>
                                {item.image ? <img src={item.image} alt={item.title} /> : <span>HÌNH ẢNH</span>}
                            </div>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.shortContent}</p>
                                <div className="meta">
                                    <div><ClockCircleOutlined /> {getTimeAgo(item.updatedAt)}</div>
                                    <a href="#">Đọc tiếp</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-center">
                        <Empty description="Không có bài viết" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardNormal;
