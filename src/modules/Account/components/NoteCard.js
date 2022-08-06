import React, { useEffect, useState } from "react";
import AddEditNote from "modules/Games/Note/components/AddEditNote";
import DeleteNoteModal from "modules/Games/Note/components/DeleteNoteModal";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import NoDataFound from "components/common/NoDataFound";
import { setPreviousUrl } from "store/actions";
import { useDispatch } from "react-redux";
import DefaultSvg from "assets/img/placeholder-card.png";
import { videoExtensions } from "constants/fileType";
import { PlaceHolderCard } from "components/preloders";
import { imageUrl } from "services/aws";

const NoteCard = ({ notes, isLoad }) => {
  const dispatch = useDispatch();
  const [addEditNoteModal, setAddEditNoteModal] = useState({
    show: false,
    data: null,
    gameId: 0,
    note: "",
    noteId: 0,
  });
  const handleClose = () => {
    setAddEditNoteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  useEffect(() => {
    dispatch(setPreviousUrl("accounts/Notes"));
  }, [dispatch]);

  const [deleteNoteModal, setDeleteNoteModal] = useState({
    show: false,
    data: null,
    id: 0,
  });

  const handleNoteClose = () => {
    setDeleteNoteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  return (
    <>
      {isLoad ? (
        <div className="row mt-3">
          <PlaceHolderCard />
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-5">
          <NoDataFound />
        </div>
      ) : (
        <div className="row">
          {notes?.map((note, index) => (
            <div
              className="c-col-xl-6 col-sm-12 col-md-6 col-lg-4 mt20"
              key={index}
            >
              <div className="card card-mylist">
                <div className="card-body c-card-body">
                  <Link
                    to={
                      note.redirect_keyword
                        ? `/${note.redirect_keyword}`
                        : `/game/${note.game_id}`
                    }
                    className="cursor-pointer"
                  >
                    <div className="card-top">
                      {videoExtensions.includes(
                        note?.attachment_url.split(".")[5]
                      ) ? (
                        <video
                          width={98}
                          height={98}
                          style={{ borderRadius: "9px" }}
                          preload="metadata"
                          className="video-thumb"
                        >
                          <source
                            src={note?.attachment_url + "#t=5"}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          src={
                            note.attachment_url
                              ? note.attachment_url.replace(
                                  imageUrl.S3GAME_URL,
                                  imageUrl.GAME_DISPLAY_URL
                                )
                              : DefaultSvg
                          }
                          alt="img"
                          className="w100 card-img-max"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="card-desc-main">
                    <h6 className="mt20">{note.game_title}</h6>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(note.note),
                      }}
                      className="note-desc"
                    ></div>
                    <div className="c-flex mt20 btn-view-details">
                      <button
                        data-toggle="modal"
                        data-target="#deletenote"
                        className="btn-delete fs13 cursor-pointer"
                        onClick={() => {
                          setDeleteNoteModal((prevState) => ({
                            ...prevState,
                            show: true,
                            id: note.game_note_id,
                          }));
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setAddEditNoteModal((prevState) => ({
                            ...prevState,
                            show: true,
                            gameId: 1,
                            note: note.note,
                            noteId: note?.game_note_id,
                            updateTime: note?.updated_datetime,
                          }));
                        }}
                        data-toggle="modal"
                        data-target="#editnote"
                        className="btn-bordered"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteNoteModal {...deleteNoteModal} onClose={handleNoteClose} />
      {addEditNoteModal.show && (
        <AddEditNote {...addEditNoteModal} onClose={handleClose} />
      )}
    </>
  );
};

export default NoteCard;
