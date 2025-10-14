import React from "react";
import { Button } from "antd";
import { FrownOutlined, ReloadOutlined } from "@ant-design/icons";

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
  message = "Đã xảy ra lỗi, vui lòng thử lại sau.",
  onRetry,
}) => {
  return (
    <div style={{height:'100vh', margin:'auto', width:'400px'}}>
      <div
        style={{
          padding: "24px 16px",
          textAlign: "center",
          width: "400px",
          height: "200px",
          alignItems: 'center'
        }}
      >
        <FrownOutlined style={{
          fontSize: 36, color: "#ff4d4f", margin: 10, marginTop: '200px'
        }} />
        <h3 style={{ color: "#cf1322", marginBottom: 8 }}>Ôi không...</h3>
        <p style={{ color: "#8c8c8c", marginBottom: 16 }}>{message}</p>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            if (onRetry) onRetry();
            else window.location.reload();
          }}
          style={{
            borderRadius: 8,
            fontWeight: 500,
            backgroundColor: "#1677ff",
          }}
        >
          Thử lại
        </Button>
      </div>
    </div>
  );
};

export default ErrorCard;
