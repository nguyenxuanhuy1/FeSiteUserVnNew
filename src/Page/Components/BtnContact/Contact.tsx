import React from "react";
import { MessageOutlined, PhoneOutlined, FacebookFilled } from "@ant-design/icons";

const Contact: React.FC = () => {
  return (
    <div className="contact-menu">
      <a href="tel:19000368" className="contact-item">
        <div className="contact-circle">
          <PhoneOutlined />
        </div>
        <span>19000368</span>
      </a>
    </div>
  );
};

export default Contact;
