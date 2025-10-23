import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NoteList";
import TrashSidebar from "./components/TrashSidebar";
import TrashList from "./components/TrashList";
import "./App.css";

function App() {
  // State untuk menyimpan semua data catatan dalam sebuah array
  const [notes, setNotes] = useState([]);
  // State untuk menyimpan catatan yang dihapus (trash)
  const [trashNotes, setTrashNotes] = useState([]);
  // State untuk mengontrol sidebar trash
  const [isTrashSidebarOpen, setIsTrashSidebarOpen] = useState(false);

  // --- Side Effects ---

  // 1. Mengambil data dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    // Coba ambil item 'keepNotes' dari penyimpanan lokal browser
    const savedNotes = localStorage.getItem("keepNotes");
    // Jika ada data yang tersimpan, ubah dari string JSON menjadi array, lalu update state
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    // Ambil data trash dari localStorage
    const savedTrash = localStorage.getItem("keepTrash");
    if (savedTrash) {
      setTrashNotes(JSON.parse(savedTrash));
    }
  }, []); // Array dependensi kosong `[]` artinya efek ini hanya berjalan sekali

  // 2. Menyimpan data ke localStorage setiap kali state 'notes' berubah
  useEffect(() => {
    // Simpan state 'notes' saat ini ke localStorage sebagai string JSON
    localStorage.setItem("keepNotes", JSON.stringify(notes));
  }, [notes]); // Efek ini berjalan setiap kali nilai `notes` berubah

  // 3. Menyimpan data trash ke localStorage setiap kali state 'trashNotes' berubah
  useEffect(() => {
    localStorage.setItem("keepTrash", JSON.stringify(trashNotes));
  }, [trashNotes]);

  // 4. Auto-delete expired trash items (setiap 1 jam)
  useEffect(() => {
    const checkExpiredTrash = () => {
      const now = new Date().getTime();
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

      setTrashNotes((currentTrash) =>
        currentTrash.filter((note) => {
          const deletedTime = new Date(note.deletedAt).getTime();
          return now - deletedTime < twoDaysInMs;
        })
      );
    };

    // Check immediately
    checkExpiredTrash();

    // Check every hour
    const interval = setInterval(checkExpiredTrash, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // --- Fungsi CRUD (Create, Read, Update, Delete) ---

  // Fungsi untuk MENAMBAH catatan baru
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(), // ID unik sederhana menggunakan timestamp
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
      imageBase64: noteData.imageBase64 || null,
    };
    // Tambahkan catatan baru ke awal array `notes`
    setNotes([newNote, ...notes]);
  };

  // Fungsi untuk MEMPERBARUI catatan yang sudah ada
  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  // Fungsi untuk MEMINDAHKAN catatan ke trash (bukan menghapus permanen)
  const moveToTrash = (id) => {
    const noteToTrash = notes.find((note) => note.id === id);
    if (noteToTrash) {
      // Tambahkan timestamp deletedAt
      const trashedNote = {
        ...noteToTrash,
        deletedAt: new Date().toISOString(),
      };

      // Pindahkan ke trash
      setTrashNotes([trashedNote, ...trashNotes]);
      // Hapus dari notes utama
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  // Fungsi untuk MENGEMBALIKAN catatan dari trash ke notes utama
  const restoreNote = (id) => {
    const noteToRestore = trashNotes.find((note) => note.id === id);
    if (noteToRestore) {
      // Hapus deletedAt property
      const { deletedAt, ...restoredNote } = noteToRestore;

      // Kembalikan ke notes utama
      setNotes([restoredNote, ...notes]);
      // Hapus dari trash
      setTrashNotes(trashNotes.filter((note) => note.id !== id));
    }
  };

  // Fungsi untuk MENGHAPUS PERMANEN catatan dari trash
  const permanentDeleteNote = (id) => {
    setTrashNotes(trashNotes.filter((note) => note.id !== id));
  };

  // Fungsi untuk membuka sidebar trash
  const openTrashSidebar = () => {
    setIsTrashSidebarOpen(true);
  };

  // Fungsi untuk menutup sidebar trash
  const closeTrashSidebar = () => {
    setIsTrashSidebarOpen(false);
  };

  // --- Tampilan Komponen ---

  return (
    <div className="app">
      <Header onTrashClick={openTrashSidebar} trashCount={trashNotes.length} />
      <main className="app-main">
        <NoteForm addNote={addNote} />
        <NotesList
          notes={notes}
          updateNote={updateNote}
          deleteNote={moveToTrash}
        />
      </main>

      {/* Trash Sidebar */}
      <TrashSidebar
        isOpen={isTrashSidebarOpen}
        onClose={closeTrashSidebar}
        trashCount={trashNotes.length}
        trashNotes={trashNotes}
        restoreNote={restoreNote}
        permanentDeleteNote={permanentDeleteNote}
      />
    </div>
  );
}

export default App;
