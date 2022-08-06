import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNote } from "store/actions";

const NoteTab = () => {
  const { notes } = useSelector((state) => state.Note);
  const [isLoad, setIsLoad] = useState(true);
  const [noteList, setNoteList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchNote({
        page_record: 100,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setNoteList(notes);
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [notes]);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-mynotes"
        role="tabpanel"
        aria-labelledby="v-pills-mynotes-tab"
      >
        <div className="tab-right-mylist noteTab">
          <h6>My Notes</h6>
        </div>
        <div>
          <NoteCard notes={noteList} isLoad={isLoad} />
        </div>
      </div>
    </>
  );
};

export default NoteTab;
