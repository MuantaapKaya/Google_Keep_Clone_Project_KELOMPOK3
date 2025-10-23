import React from "react";
import "./Header.css";

function Header({ onTrashClick, trashCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <svg
            className="header-logo"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fbc02d"
              d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
            />
          </svg>
          <h1 className="header-title">Keep</h1>
        </div>
        <div className="header-right">
          <button
            className="header-trash-btn"
            onClick={onTrashClick}
            title="View Trash"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
            {trashCount > 0 && (
              <span className="header-trash-count">{trashCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
