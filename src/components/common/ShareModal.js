import React, { useEffect, useState } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import copyIcon from "assets/img/copyclip.png";
import closePopup from "assets/img/close.svg";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FetchGameLink } from "store/actions";

const ShareModal = ({ show, onClose, url, name, gameId }) => {
  const dispatch = useDispatch();
  const [Link, setLink] = useState({
    web_link: "",
    deep_link: "",
  });

  useEffect(() => {
    dispatch(
      FetchGameLink(gameId, (data) => {
        setLink({
          web_link: data.web_link,
          deep_link: data.deep_link,
        });
      })
    );
  }, []);

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="editGameFilter"
      className="modal-dialog modal-dialog-centered "
    >
      <ToastContainer />
      <div className="modal-content">
        <div className="modal-header justify-content-end pb-0">
          {/* <div className="modal-body add-body "> */}

          <div className="modal-body text-center share-modal-body  pt-0">
            <button
              type="button"
              className="close pt-2 pr-0"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              {/* <span aria-hidden="true"> */}
              <img src={closePopup} alt="" />
              {/* </span> */}
            </button>
            {/* <div className="c-delete-note-content"> */}
            <FacebookShareButton
              className="mr-3"
              url={Link.web_link}
              quote={`Check out this game "${name}" in Grow Games App.
              View in App:  ${Link.deep_link}
              View on web: ${Link.web_link}`}
              id="facebookShare"
              description={"aiueo"}
            >
              <FacebookIcon size={66} round bgStyle={{ fill: "#4267b2" }} />
              <UncontrolledTooltip target="facebookShare">
                <div className="tooltip-subtext">Facebook Share</div>
              </UncontrolledTooltip>
            </FacebookShareButton>
            <TwitterShareButton
              className="mr-3"
              url={Link.web_link}
              title={`Check out this game "${name}" in Grow Games App.
              View in App: ${Link.deep_link}
              View on web: ${Link.web_link}`}
              id="twitterShare"
            >
              <TwitterIcon size={66} round bgStyle={{ fill: "#55acee" }} />
              <UncontrolledTooltip target="twitterShare">
                <div className="tooltip-subtext">Twitter Share</div>
              </UncontrolledTooltip>
            </TwitterShareButton>
            <EmailShareButton
              className="mr-3"
              url={Link.web_link}
              subject={`Check out this game ${name} in Grow Games App.`}
              body={`Check out this game "${name}" in Grow Games App.
              View in App: ${Link.deep_link}
              View on web: ${Link.web_link}`}
              id="emailShare"
            >
              <EmailIcon size={66} round bgStyle={{ fill: "#7d7d7d" }} />
              <UncontrolledTooltip target="emailShare">
                <div className="tooltip-subtext">E-Mail Share</div>
              </UncontrolledTooltip>
            </EmailShareButton>
            <button className="react-share__ShareButton mr-3">
              <img
                className="pointer share-modal-copy-clipboard"
                src={copyIcon}
                alt=""
                onClick={() => {
                  navigator.clipboard
                    .writeText(`Check out this game "${name}" in Grow Games App.
                  View in App: ${Link.deep_link}
                  View on web: ${Link.web_link}`);
                  toast.success("Link Copied To Clipboard");
                }}
                id="copyClipboard"
              />
              <UncontrolledTooltip target="copyClipboard">
                <div className="tooltip-subtext">Copy Clipboard</div>
              </UncontrolledTooltip>
              {/* </div> */}
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
