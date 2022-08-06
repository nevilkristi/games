import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import closePopup from "../../../../assets/img/close.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addUpdateNote } from "store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
const AddEditNote = ({
  show,
  mode,
  data,
  onSubmit,
  onClose,
  gameId,
  note,
  noteId,
  notes,
  updateTime,
}) => {
  const [editorText, setEditor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteId !== undefined) {
      setEditor(note);
    }
  }, [noteId]);

  const handleAddEdit = () => {
    if (noteId !== undefined) {
      dispatch(
        addUpdateNote({
          game_id: gameId,
          note: editorText,
          game_note_id: noteId,
        })
      );
    } else {
      dispatch(
        addUpdateNote({
          game_id: gameId,
          note: editorText,
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="noteModal"
      className="modal-dialog c-modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Note
          </h5>
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={onClose}>
              <img src={closePopup} alt="close" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <p className="c-edit-note-p">
            Last Edited Date: {moment(updateTime).format("MM/DD/YYYY")}
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
            <button
              className="btn-dull gameInfo cust-padd-bt"
              data-dismiss="modal"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              className="btn-primary cust-padd-btn cursor-pointer"
              onClick={handleAddEdit}
            >
              {editorText ? "SAVE" : "ADD"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEditNote;
