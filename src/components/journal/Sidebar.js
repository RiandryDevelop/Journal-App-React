import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { JournalEntries } from "./JournalEntries";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { debounce } from "../../helpers/debouncefn";
// LightBulb css
import "./Sidebar_extra.css";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  console.log(name);
  const updateFlashlight = (e) => {
    let style = document.body.style;
    style.backgroundPositionX = e.pageX - 250 + "px";
    style.backgroundPositionY = e.pageY - 250 + "px";
  };

  const handleUpdateFlashlight = (e) => {
    var body = document.body;
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      updateFlashlight(e);
      ["mousemove", "touchstart", "touchmove", "touchend"].forEach(function (
        s
      ) {
        document.documentElement.addEventListener(s, updateFlashlight, false);
      });
    } else {
      ["mousemove", "touchstart", "touchmove", "touchend"].forEach(function (
        s
      ) {
        document.documentElement.removeEventListener(
          s,
          updateFlashlight,
          false
        );
      });
    }
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  const debounceAddNew = useCallback(debounce(handleAddNew, 3000), []);

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <div className="dark_mode" onClick={handleUpdateFlashlight}></div>
          <span> {name}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={debounceAddNew}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
