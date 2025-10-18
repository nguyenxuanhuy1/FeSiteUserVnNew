import { Divider, Empty, Pagination } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Post, PostCoTotal } from '../interface';
import { getTimeAgo } from '../../tinhTime';
import { useNavigate } from "react-router-dom";

const CardNormal: React.FC<PostCoTotal> = ({
    data,

}) => {
    const navigate = useNavigate();
    const GetSlug = (slug: String) => {
        navigate(`/bai-viet/${slug}`);
    };
    const hasItems = Array.isArray(data) && data.length > 0;
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
                    <div style={{ padding: 24, width: '100%', textAlign: 'center', margin:'auto' }}>
                        <Empty description="Không có bài viết" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardNormal;
