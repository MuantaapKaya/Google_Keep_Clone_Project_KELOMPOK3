import React, { useState } from 'react';
import './Note.css';

function Note({ note, updateNote, deleteNote }) {
// State untuk melacak apakah catatan sedang diedit atau tidak
const [isEditing, setIsEditing] = useState(false);
// State untuk menyimpan judul dan konten yang sedang diedit
const [editTitle, setEditTitle] = useState(note.title);
const [editContent, setEditContent] = useState(note.content);
const date = new Date(note.createdAt);

// Format tanggal pembuatan catatan
const day = String(date.getDate()).padStart(2, '0'); //Ambil hari
const month = String(date.getMonth() + 1).padStart(2, '0'); //ambil bulan
const year = date.getFullYear(); // Ambil Tahun

const formattedDate = `${day}/${month}/${year}`;

    // Fungsi untuk menyimpan catatan yang sudah diedit
    const handleSave = () => {
        updateNote(note.id, {
            ...note,
            title: editTitle,
            content: editContent
        });
        setIsEditing(false); // Keluar dari mode edit setelah menyimpan
    };

    // Fungsi untuk membatalkan proses edit dan mengembalikan nilai asli
    const handleCancel = () => {
        setEditTitle(note.title);
        setEditContent(note.content);
        setIsEditing(false); // Keluar dari mode edit
    };

    // Fungsi untuk menghapus catatan dengan konfirmasi
    const handleDelete = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            deleteNote(note.id);
        }
    };

    return (
        <div className="note">
            {isEditing ? (
                // Tampilan Mode Edit
                <div className="note-edit">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Judul"
                        className="note-edit-input"
                        autoFocus
                    />
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Tulis catatan..."
                        className="note-edit-textarea"
                        rows={4}
                    />
                    <div className="note-edit-actions">
                        <button onClick={handleSave} className="note-button note-button-save">
                            Save
                        </button>
                        <button onClick={handleCancel} className="note-button note-button-cancel">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // Tampilan Mode Lihat (Default)
                <div className="note-view" onClick={() => setIsEditing(true)}>
                    <img src={note.imageBase64} alt="Note content" className="note-image" />
                    {note.title && <h3 className="note-title">{note.title}</h3>}
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">
                        Dibuat pada: {formattedDate}
                    </p>
                    <div className="note-actions">
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Mencegah mode edit aktif saat tombol hapus diklik
                                handleDelete();
                            }}
                            className="note-delete"
                            title="Hapus catatan"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Note;