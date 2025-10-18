import React, { useEffect, useState } from "react";
import { Skeleton, Card, Empty } from "antd";
import { callData } from "../../../../Api/CallApi";
import LinkApi from "../../../../Hook/LinkApi";

interface Video {
  id: number;
  title: string;
  link: string;
}

const VideoList: React.FC = () => {
  const [data, setData] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewClass = async () => {
      setLoading(true);
      try {
        const res = await callData({
          url: `${LinkApi.LinkYT}`,
        });

        setData(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewClass();
  }, []);

  const renderSkeleton = () => (
    <div className="video-grid">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="video-card">
          <Skeleton.Image active className="video-frame" />
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        </Card>
      ))}
    </div>
  );

  const renderVideos = () => (
    <div className="video-grid">
      {data.map((video) => (
        <div key={video.id} className="video-card">
          <div className="video-frame">
            <iframe
              src={video.link}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "3px" }}
            ></iframe>
          </div>
          <h3 className="video-title">{video.title}</h3>
        </div>
      ))}
    </div>
  );

  return (
    <div className="video-container">
      {loading ? (
        renderSkeleton()
      ) : data.length === 0 ? (
        <Empty description="Không có dữ liệu video" />
      ) : (
        renderVideos()
      )}
    </div>
  );
};

export default VideoList;
