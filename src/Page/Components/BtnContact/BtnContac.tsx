import React, { useState } from "react";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import Contact from "./Contact";

const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-contact">
      {open && <Contact />}

      <button className="floating-btn" onClick={() => setOpen(!open)}>
        {open ? <CloseOutlined /> : <MessageOutlined/>}
      </button>
    </div>
  );
};

export default FloatingContact;
