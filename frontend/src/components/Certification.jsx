import React from "react";
import { certificationStyles as s } from "../assets/dummyStyles";
import C3 from "../assets/C3.png";
import C1 from "../assets/C1.png";
import C2 from "../assets/C2.png";
import C4 from "../assets/C4.svg";
import C5 from "../assets/C5.png";
import C6 from "../assets/C6.png";
import C7 from "../assets/C7.svg";

const Certification = () => {
  const certifications = [
    { id: 1, name: "Medical Commission", image: C1, type: "international" },
    { id: 2, name: "Government Approved", image: C2, type: "government" },
    {
      id: 3,
      name: "NABH Accredited",
      image: C3,
      alt: "NABH Accreditation",
      type: "healthcare",
    },
    { id: 4, name: "Medical Council", image: C4, type: "government" },
    {
      id: 5,
      name: "Quality Healthcare",
      image: C5,
      alt: "Quality Healthcare",
      type: "healthcare",
    },
    {
      id: 6,
      name: "Paramedical Council",
      image: C6,
      alt: "Patient Safety",
      type: "healthcare",
    },
    {
      id: 7,
      name: "Ministry of Health",
      image: C7,
      alt: "Ministry of Health",
      type: "government",
    },
  ];

  const duplicatedCertifications = [
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <div className={s.container}>
      <div className={s.backgroundGrid}>
        <div className={s.topLine}>
          <div className={s.gridContainer}>
            <div className={s.grid}>
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={s.gridCell}></div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.contentWrapper}>
          <div className={s.headingContainer}>
            <div className={s.headingInner}>
              <div className={s.leftLine}></div>
              <div className={s.rightLine}></div>
              <h2 className={s.title}>
                <span className={s.titleText}>CERTIFIED & EXCELLENCE</span>
              </h2>
            </div>
            <p className={s.subtitle}>
              Government recognized and internationally accredited healthcare
              standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;
