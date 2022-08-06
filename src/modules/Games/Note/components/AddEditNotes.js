import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addUpdateNote } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import DeleteNoteModal from "./DelteNoteModal";
import moment from "moment";

const AddEditNote = ({ show, mode, onClose, gameId, note }) => {
  const [editorText, setEditor] = useState(note);
  const dispatch = useDispatch();
  const { SingleGame } = useSelector((state) => state.Game);

  const [deleteNoteModal, setDeleteNoteModal] = useState({
    show: false,
    data: null,
  });

  useEffect(() => {
    if (SingleGame.game_note_id !== undefined) {
      setEditor(note);
    }
  }, [SingleGame.game_note_id]);

  const handleAddEdit = () => {
    if (SingleGame.game_note_id === 0) {
      dispatch(
        addUpdateNote({
          game_id: gameId,
          note: editorText,
          game_note_id: 0,
        })
      );
    } else {
      dispatch(
        addUpdateNote({
          game_id: gameId,
          note: editorText,
          game_note_id: SingleGame.game_note_id,
        })
      );
    }
    onClose();
  };

  const handleClose = () => {
    setDeleteNoteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="noteModal"
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {mode === "Add" ? "Add Note " : "Edit Note"}
          </h5>
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={onClose}>
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <p className="c-edit-note-p">
            {SingleGame.note_updated_date !== "" && (
              <>
                Last Edited Date:{" "}
                {moment(SingleGame.note_updated_date).format("MM/DD/YYYY")}
              </>
            )}
          </p>
          <div className="form-group">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "bold",
                  "italic",
                  "underline",
                  "bulletedList",
                  "numberedList",
                ],
              }}
              data={editorText}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditor(data);
              }}
            />
          </div>
          <div className="cust-btn-flex justify-content-center mt20">
            {mode === "Edit" ? (
              <button
                className="btn-danger cust-padd-btn cursor-pointer "
                type="button"
                onClick={() => {
                  setDeleteNoteModal((prevState) => ({
                    ...prevState,
                    show: true,
                  }));
                }}
              >
                Delete Note
              </button>
            ) : (
              ""
            )}
            <button
              className="btn-primary cust-padd-btn cursor-pointer"
              onClick={handleAddEdit}
            >
              {/* {editorText ? "UPDATE" : "ADD"} */}
              {mode === "Add" ? "Add" : "Save"}
            </button>
          </div>
        </div>
      </div>
      {deleteNoteModal.show && (
        <DeleteNoteModal
          {...deleteNoteModal}
          onClose={handleClose}
          id={SingleGame.game_note_id}
          onCloseModel={onClose}
          gameId={gameId}
        />
      )}
    </Modal>
  );
};

export default AddEditNote;
