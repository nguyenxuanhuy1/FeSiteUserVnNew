import React, { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { CardHotProps } from '../interface';
import { getTimeAgo } from '../../tinhTime';
import { useNavigate } from "react-router-dom";
const CardHot: React.FC<CardHotProps> = ({ posts, loading = false }) => {
  const [fixedBottom, setFixedBottom] = useState(false);
  const navigate = useNavigate();
  const GetSlug = (slug: String) => {
    navigate(`/bai-viet/${slug}`);
  };
  useEffect(() => {
    const handleScroll = () => setFixedBottom(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`cardHotMain ${fixedBottom ? "header-fixed-padding" : ""}`}>
      {loading
        ? Array.from({ length: 1 }).map((_, index) => (
          <div className="cardHotItem" key={index}>
            <div className="cardHotImage" style={{ position: "relative", height: 450 }}>
              <Skeleton.Image style={{ width: "100%", height: "100%" }} active />
              <div className="cardHotOverlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", padding: 16 }}>
                <Skeleton.Input style={{ width: 60, marginBottom: 8 }} active size="small" />
                <Skeleton.Input style={{ width: "80%", marginBottom: 8 }} active size="default" />
                <div className="cardHotFooter" style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <Skeleton.Input style={{ width: 100, height: 12 }} active size="small" />
                  <Skeleton.Input style={{ width: 60, height: 12 }} active size="small" />
                </div>
              </div>
            </div>
          </div>
        ))
        : posts.map((item) => (
          <div className="cardHotItem" key={item.id} onClick={() => GetSlug(item.slug)}>
            <div
              className="cardHotImage"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                height: 450,
              }}
            >
              <div className="cardHotOverlay">
                {item.isFeatured && <span className="cardHotHighlight">HOT</span>}
                <h3 className="cardHotTitle">{item.title}</h3>
                <div className="cardHotFooter">
                  <div className="cardHotViews" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                    <EyeOutlined style={{ marginRight: 1 }} />
                    {item.views?.toLocaleString()} lượt xem
                  </div>
                  <span className="cardHotDate">
                    <ClockCircleOutlined style={{ color: 'rgba(255,255,255,0.7)' }} />
                    &nbsp;{getTimeAgo(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardHot;
