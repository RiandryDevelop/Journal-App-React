import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { uiCloseModal } from "../../actions/ui";
import { startDeleteNoteUrl } from "../../actions/notes";
import { fileDelete } from "../../helpers/fileDelete";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

export const NoteModal = ({ url }) => {
  const { modalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const closeModal = () => {
    dispatch(uiCloseModal());
  };

  //  Change image event
  const handleChangeFile = () => {
    document.querySelector("#fileSelector").click();
  };

  //  Delete image event
  const handleDeletingFile = async (e) => {
    e.preventDefault();
    fileDelete(active.url);
    dispatch(startDeleteNoteUrl(active));
    closeModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      ariaHideApp={!process.env.NODE_ENV === "test"}
    >
      <div className="card">
        <img src={url} className="card-img-top" alt="... " />
        <div className="card-body">
          <h5 className="card-title">EDIT FILE</h5>
          <button className="btn btn-successfully" onClick={handleChangeFile}>
            Change File
          </button>
          <button className="btn btn-danger" onClick={handleDeletingFile}>
            Delete File
          </button>
        </div>
      </div>
    </Modal>
  );
};
