import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiOpenModal } from "../../actions/ui";

import { NotesAppBar } from "./NotesAppBar";
import { NoteModal } from "./NoteModal";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    let isDelete = window.confirm(`Are you sure you want to delete the note?`);

    if (isDelete) {
      dispatch(startDeleting(id));
    } else {
      return;
    }
  };

  // Event to open the modal
  const onDoubleClick = (e) => {
    console.log(e);
    dispatch(uiOpenModal());
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" onClick={onDoubleClick} />
          </div>
        )}
      </div>

      <NoteModal url={note.url} />
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
