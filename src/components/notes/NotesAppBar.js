import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

import DateTimePicker from "react-datetime-picker";
import moment from "moment";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const noteDate = moment(active.date);
  const [dateStart, setDateStart] = useState(noteDate.toDate());
  const [formValues, setFormValues] = useState(active);

  const handleSave = () => {
    dispatch(startSaveNote(active));
    dispatch(startSaveNote(formValues)); ///testing func
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  const handleDateChange = (e) => {
    setDateStart(e.getTime());
    setFormValues({
      ...formValues,
      date: e.getTime(),
    });
 
  };

  return (
    <div className="notes__appbar">
      <div className="form-group">
        <DateTimePicker
          onChange={handleDateChange}
          value={dateStart}
          className="form-control"
        />
      </div>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
