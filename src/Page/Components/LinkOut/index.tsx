import React from 'react';

const ScrollingTextLinks = () => {
  const links = [
    { text: 'VneID', url: 'https://vneid.gov.vn/' },
    { text: 'Báo chính phủ', url: 'https://baochinhphu.vn/' },
    { text: 'Báo quân đội', url: 'https://www.qdnd.vn/' },
    { text: 'Tin tức mới', url: 'https://dantri.com.vn/' },
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '10vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <style>{`
          @keyframes scrollLeft {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          @keyframes scrollRight {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .scroll-container {
            display: flex;
            gap: 30px;
            padding: 20px 0;
          }
          
          .scroll-left {
            animation: scrollLeft 20s linear infinite;
          }
          
          .scroll-right {
            animation: scrollRight 20s linear infinite;
          }
          
          .text-box {
            flex-shrink: 0;
            padding: 25px 50px;
            background: white;
            border-radius: 15px;
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-decoration: none;
            display: inline-block;
            white-space: nowrap;
          }
          
          .text-box:hover {
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
        `}</style>
        
        
        {/* chạy sang phải */}
        <div className="scroll-container scroll-right">
          {[...links, ...links, ...links].map((link, index) => (
            <a
              key={`right-${index}`}
              href={link.url}
              className="text-box"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
        
        {/* chạy sang trái */}
        {/* <div className="scroll-container scroll-left">
          {[...links, ...links, ...links].map((link, index) => (
            <a
              key={`left2-${index}`}
              href={link.url}
              className="text-box"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ScrollingTextLinks;