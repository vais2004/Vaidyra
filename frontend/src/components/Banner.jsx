import React from "react";
import { bannerStyles as s } from "../assets/dummyStyles";
import { Star, Stethoscope } from "lucide-react";

const Banner = () => {
  return (
    <div className={s.bannerContainer}>
      <div className={s.mainContainer}>
        <div className={s.borderOutline}>
          <div className={s.outerAnimatedBand}></div>
          <div className={s.innerWhiteBorder}></div>
        </div>

        <div className={s.contentContainer}>
          <div className={s.flexContainer}>
            <div className={s.leftContent}>
              <div className={s.headerBadgeContainer}>
                <div className={s.stethoscopeContainer}>
                  <div className={s.stethoscopeInner}>
                    <Stethoscope className={s.stethoscopeIcon} />
                  </div>
                </div>
                <div className={s.titleContainer}>
                  <h1 className={s.title}>
                    Vaid
                    <span className={s.titleGradient}>yra+</span>
                  </h1>
                  {/* stars */}
                  <div className={s.starsContainer}>
                    <div className={s.starsInner}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star className={s.starIcon} key={star} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* tagline */}
              <p className={s.tagline}>
                Premium Healthcare
                <span className={`block ${s.taglineHighlight}`}>
                  At Your Fingertips
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
