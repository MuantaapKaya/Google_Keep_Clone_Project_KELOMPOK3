import React from "react";
import "./TrashNote.css";

function TrashNote({ note, restoreNote, permanentDeleteNote }) {
  const date = new Date(note.deletedAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Hitung waktu tersisa sebelum permanent delete (2 hari)
  const deleteTime = new Date(note.deletedAt).getTime();
  const permanentDeleteTime = deleteTime + 2 * 24 * 60 * 60 * 1000; // 2 hari dalam ms
  const now = new Date().getTime();
  const timeLeft = permanentDeleteTime - now;

  const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));
  const daysLeft = Math.max(0, Math.floor(hoursLeft / 24));
  const remainingHours = hoursLeft % 24;

  const handleRestore = () => {
    if (window.confirm("Ingin mengembalikan catatan ini?")) {
      restoreNote(note.id);
    }
  };

  const handlePermanentDelete = () => {
    if (
      window.confirm(
        "Ingin menghapus catatan ini secara permanen? Aksi ini tidak dapat dibatalkan."
      )
    ) {
      permanentDeleteNote(note.id);
    }
  };

  return (
    <div className="trash-note">
      <div className="trash-note-content">
        {note.imageBase64 && (
          <img
            src={note.imageBase64}
            alt="Note content"
            className="trash-note-image"
          />
        )}
        {note.title && <h3 className="trash-note-title">{note.title}</h3>}
        <p className="trash-note-text">{note.content}</p>
        <div className="trash-note-meta">
          <p className="trash-note-date">Deleted: {formattedDate}</p>
          {timeLeft > 0 ? (
            <p className="trash-note-time-left">
              Auto-delete in: {daysLeft}d {remainingHours}h
            </p>
          ) : (
            <p className="trash-note-expired">Expired - will be deleted soon</p>
          )}
        </div>
      </div>
      <div className="trash-note-actions">
        <button
          onClick={handleRestore}
          className="trash-note-button trash-note-restore"
          title="Restore note"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
          Restore
        </button>
        <button
          onClick={handlePermanentDelete}
          className="trash-note-button trash-note-delete"
          title="Permanently delete"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
          Delete Forever
        </button>
      </div>
    </div>
  );
}

export default TrashNote;
