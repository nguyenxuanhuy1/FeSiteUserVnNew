import { ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className="floating-contact"

            style={{
                display: visible ? "block" : "none",
                marginBottom: '80px'
            }}
        >
            <button
                onClick={scrollToTop}
                className="floating-btn"
            >
                <ArrowUpOutlined/>
            </button>
        </div>
    );
};

export default ScrollToTopButton;
