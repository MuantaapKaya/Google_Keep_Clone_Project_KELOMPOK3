import React from "react";
import TrashNote from "./TrashNote";
import "./TrashList.css";

function TrashList({ trashNotes, restoreNote, permanentDeleteNote }) {
  // Jika tidak ada catatan di trash
  if (trashNotes.length === 0) {
    return (
      <div className="trash-empty">
        <svg width="120" height="120" viewBox="0 0 24 24">
          <path
            fill="#e0e0e0"
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
        <p className="trash-empty-text">No items in trash</p>
      </div>
    );
  }

  // Jika ada catatan di trash, tampilkan dalam bentuk grid
  return (
    <div className="trash-container">
      <div className="trash-grid">
        {trashNotes.map((note) => (
          <TrashNote
            key={note.id}
            note={note}
            restoreNote={restoreNote}
            permanentDeleteNote={permanentDeleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default TrashList;
