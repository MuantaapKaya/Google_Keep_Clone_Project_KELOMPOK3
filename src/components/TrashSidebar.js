import React from "react";
import TrashList from "./TrashList";
import "./TrashSidebar.css";

function TrashSidebar({
  isOpen,
  onClose,
  trashCount,
  trashNotes,
  restoreNote,
  permanentDeleteNote,
}) {
  return (
    <div className={`trash-sidebar ${isOpen ? "trash-sidebar-open" : ""}`}>
      <div className="trash-sidebar-header">
        <h2>Trash</h2>
        <button className="trash-sidebar-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
      <div className="trash-sidebar-content">
        <div className="trash-info">
          <p>{trashCount} item(s) in trash</p>
          <p className="trash-warning">
            Items will be permanently deleted after 2 days
          </p>
        </div>
        <div className="trash-sidebar-list">
          <TrashList
            trashNotes={trashNotes}
            restoreNote={restoreNote}
            permanentDeleteNote={permanentDeleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default TrashSidebar;
