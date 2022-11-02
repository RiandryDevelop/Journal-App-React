import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startSaveNote,
  startUploading,
  startUploadingDate,
  startUploadingDateLabel,
} from "../../actions/notes";

import DateTimePicker from "react-datetime-picker";
import moment from "moment";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const [dateStart, setDateStart] = useState(active.date);
  const [isAM, setisAM] = useState(active.dateLabel);
  const [formValues, setFormValues] = useState(active);

  const handleSave = () => {
    dispatch(startSaveNote(active));
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
    let eventTime = moment(e).toDate().getTime();
    setDateStart(eventTime);
    setFormValues({
      ...formValues,
      date: eventTime,
    });
    dispatch(startUploadingDate(formValues.date));
  };
  const handleAMPM = (e) => {
    e.preventDefault();
    setisAM(!isAM);
    setFormValues({
      ...formValues,
      dateLabel: isAM,
    });
    dispatch(startUploadingDateLabel(formValues.dateLabel));
  };
  return (
    <div className="notes__appbar">
      <div className="form-group">
        <DateTimePicker
          onChange={handleDateChange}
          value={moment(dateStart).toDate()}
          className="form-control"
          amPmAriaLabel="AM"
          format="y-MM-dd h:mm"
          clockClassName="class1 class2"
        />
        <button onClick={handleAMPM}>{isAM ? <p>AM</p> : <p>PM</p>}</button>
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
