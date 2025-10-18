import React from "react";
import { MessageOutlined, PhoneOutlined, FacebookFilled } from "@ant-design/icons";

const Contact: React.FC = () => {
  return (
    <div className="contact-menu">
      <a href="tel:0987654321" className="contact-item">
        <div className="contact-circle">
          <PhoneOutlined />
        </div>
        <span>0987654321</span>
      </a>
    </div>
  );
};

export default Contact;
