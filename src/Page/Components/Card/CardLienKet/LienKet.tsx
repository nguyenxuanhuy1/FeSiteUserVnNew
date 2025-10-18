import React from "react";

import Cp1 from "../../../../assets/antv.png";
import Cp2 from "../../../../assets/chinh-phu.png";
import Cp3 from "../../../../assets/conganhnhandan.jpg";
import Cp4 from "../../../../assets/cpcan.jpg";
import Cp5 from "../../../../assets/phap-dien.jpg";
import Cp6 from "../../../../assets/phunu.png";
import Cp7 from "../../../../assets/conganhnhandanloai1.png";
import Cp8 from "../../../../assets/thuongmaitudo.png";
const logos = [
  { src: Cp1, url: "https://www.antv.gov.vn" },
  { src: Cp2, url: "https://chinhphu.vn" },
  { src: Cp3, url: "https://cand.com.vn" },
  { src: Cp4, url: "https://congbao.chinhphu.vn/" },
  { src: Cp5, url: "https://phapdien.moj.gov.vn" },
  { src: Cp6, url: "https://www.facebook.com/profile.php?id=100063553415945&mibextid=LQQJ4d" },
  { src: Cp7, url: "https://cand.com.vn/" },
  { src: Cp8, url: "https://fta.gov.vn/" },
];

const LienKet = () => {
  return (
    <div className="lienket-container">
      <div className="logo-track">
        {[...logos, ...logos].map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img src={item.src} alt={`logo-${index}`} className="logo-item" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LienKet;
