import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { imageUrl } from "services/aws";
import DefaultSvg from "assets/img/placeholder-card.png";

const thumbnailUrl = (url) => {
  if (!url) return DefaultSvg;
  const splitted = url.split(".");
  splitted.pop();
  return (splitted.join(".") + ".jpg").replace(
    imageUrl.S3GAME_URL,
    imageUrl.GAME_THUMBNAIL_URL
  );
};

function GameInfoSlider({ attachments }) {
  const nav1 = useRef(null);
  const nav2 = useRef(null);

  useEffect(() => {
    SetSlideShow(attachments.length);
    if (attachments.length > 3) {
      SetSlideShow(4);
    }
  }, [attachments]);

  const [slideShow, SetSlideShow] = useState(4);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slideShow,
    slidesToScroll: 1,
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="GameInfoSlider">
      <Slider
        {...settings2}
        asNavFor={nav1.current}
        ref={nav2}
        style={{
          marginTop: "20px",
        }}
      >
        {attachments.map((attachment, index) => (
          <div key={index} className="BottomSlider">
            {attachment.attachment_type === 2 ? (
              <video
                style={{
                  maxWidth: "100%",
                  width: "100%",
                }}
                preload="metadata"
                controls
                className="pointer"
              >
                <source src={attachment.attachment_url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={
                  attachment.attachment_url
                    ? attachment.attachment_url.replace(
                        imageUrl.S3GAME_URL,
                        imageUrl.GAME_DISPLAY_URL
                      )
                    : ""
                }
                className="pointer"
                style={{
                  maxWidth: "100%",
                }}
                alt="attachment-url"
              />
            )}
          </div>
        ))}
      </Slider>
      {slideShow > 1 && (
        <Slider
          className="SmallGameInfoSlider"
          {...settings}
          asNavFor={nav2.current}
          ref={nav1}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {attachments.map((attachment, index) => (
            <div className="test" key={index}>
              {attachment.attachment_type === 2 ? (
                <img
                  src={thumbnailUrl(attachment.attachment_url)}
                  className="pointer"
                  style={{
                    maxWidth: "100%",
                  }}
                  alt="attachment-url"
                />
              ) : (
                <img
                  src={attachment.attachment_url.replace(
                    imageUrl.S3GAME_URL,
                    imageUrl.GAME_DISPLAY_URL
                  )}
                  className="pointer"
                  alt="attachment-url"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default GameInfoSlider;
