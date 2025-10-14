import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { CardHotProps } from "../interface";
import { Skeleton } from "antd";
import { getTimeAgo } from "../../tinhTime";
import { useNavigate } from "react-router-dom";
const TagList: React.FC<CardHotProps> = ({ posts, loading = false }) => {
  const navigate = useNavigate();
  const GetSlug = (slug: String) => {
    navigate(`/bai-viet/${slug}`);
  };   
  return (
    <div className="tag-list">
      {loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <div className="card" key={index}>
            <div className="image">
              <Skeleton.Image style={{ width: 160, height: 100 }} active />
            </div>

            <div className="content" style={{ flex: 1 }}>
              <h3>
                <Skeleton.Input style={{ width: '80%', marginBottom: 8 }} active />
              </h3>

              <div className="bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="tags">
                  <Skeleton.Input style={{ width: 100 }} active size="small" />
                </div>

                <div className="time">
                  <Skeleton.Input style={{ width: 60 }} active size="small" />
                </div>
              </div>
            </div>
          </div>
        ))
      }

      {posts.map((item) => (
        <div
          key={item.id}
          className="card"
          onClick={() => GetSlug(item.slug)}
        >
          <div className="image">
            <img src={item.image} alt={item.title} />
          </div>

          <div className="content">
            <h3>{item.title}</h3>

            <div className="bottom">
              <div>
                <EyeOutlined style={{ marginRight: 1 }} />
                {item.views?.toLocaleString()}
              </div>
              <div className="time">
                {getTimeAgo(item.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default TagList;
