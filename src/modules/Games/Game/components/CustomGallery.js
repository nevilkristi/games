import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import closePopup from "assets/img/close.svg";
import ReportAttachmentModal from "./ReportAttachmentModal";
import { imageUrl } from "services/aws";
// import profilePlaceholder from "assets/img/user-img.jpg";
import profilePlaceholder from "assets/img/profile-placeholder.png";
function CustomGallery({ data, onClose, index, profile = false }) {
  const [reportModal, setReportModal] = useState({
    show: false,
    id: 0,
  });

  const closeReportModal = (galleryClose = false) => {
    galleryClose && onClose();
    setReportModal({
      show: false,
      id: 0,
    });
  };
  return (
    <div className="custom-gallery-lightbox">
      <div>
        <img
          src={closePopup}
          onClick={onClose}
          className="close-btn gallery-closePopUp pointer p-0"
          alt=""
        />
      </div>

      <Carousel
        useKeyboardArrows={true}
        selectedItem={index}
        showThumbs={false}
        autoFocus={true}
        showArrows={true}
      >
        {data?.map((attachment, i) => {
          return attachment.attachment_url ? (
            <>
              {attachment.attachment_type === 1 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {attachment.attachment_url && (
                    <img
                      src={attachment.attachment_url.replace(
                        imageUrl.S3GAME_URL,
                        imageUrl.GAME_DISPLAY_URL
                      )}
                      alt="attachment-url"
                      className="lightbox-img"
                    />
                  )}
                  {profile && (
                    <div className="lightbox-profile-detail   ">
                      <img
                        src={
                          attachment.profile_image == ""
                            ? profilePlaceholder
                            : attachment?.profile_image
                        }
                        className="review-person-img"
                        alt="attachment-url"
                      />
                      <div className="ml-3">
                        <h5 className="green-text mb-1">
                          {attachment.display_name}
                        </h5>
                        <div>
                          <span className="gray-text ml-2">
                            {attachment.updated_datetime}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button button-primary button-sm dark-gray-text ml-4 report-button m-0"
                        onClick={() => {
                          setReportModal({
                            show: true,
                            id: attachment.game_attachment_id,
                          });
                        }}
                      >
                        Report Abuse
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <video
                    // style={{
                    //   width: "23% !important",
                    //   maxHeight: "420px",
                    //   objectFit: "contain",
                    // }}
                    className="lightbox-video"
                    preload="metadata"
                    controls
                  >
                    <source src={attachment.attachment_url} type="video/mp4" />
                  </video>
                  {profile && (
                    <div className="lightbox-profile-detail">
                      <img
                        src={
                          attachment.profile_image == ""
                            ? profilePlaceholder
                            : attachment?.profile_image
                        }
                        className="review-person-img"
                        alt="attachment-url"
                      />
                      <div className="ml-3">
                        <h5 className="green-text mb-1">
                          {attachment.display_name}
                        </h5>
                        <div>
                          <span className="gray-text ml-2">
                            {attachment.updated_datetime}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="button button-primary button-sm dark-gray-text ml-4  report-button m-0"
                        onClick={() => {
                          setReportModal({
                            show: true,
                            id: attachment.game_attachment_id,
                          });
                        }}
                      >
                        Report Abuse
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : null;
        })}
      </Carousel>
      <ReportAttachmentModal
        show={reportModal.show}
        onClose={closeReportModal}
        id={reportModal.id}
      />
    </div>
  );
}

export default CustomGallery;
