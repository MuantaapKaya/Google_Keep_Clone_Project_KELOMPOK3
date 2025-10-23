
import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NoteList';
import './App.css';

function App() {
    // State untuk menyimpan semua data catatan dalam sebuah array
    const [notes, setNotes] = useState([]);

    // --- Side Effects ---

    // 1. Mengambil data dari localStorage saat aplikasi pertama kali dimuat
    useEffect(() => {
        // Coba ambil item 'keepNotes' dari penyimpanan lokal browser
        const savedNotes = localStorage.getItem('keepNotes');
        // Jika ada data yang tersimpan, ubah dari string JSON menjadi array, lalu update state
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []); // Array dependensi kosong `[]` artinya efek ini hanya berjalan sekali

    // 2. Menyimpan data ke localStorage setiap kali state 'notes' berubah
    useEffect(() => {
        // Simpan state 'notes' saat ini ke localStorage sebagai string JSON
        localStorage.setItem('keepNotes', JSON.stringify(notes));
    }, [notes]); // Efek ini berjalan setiap kali nilai `notes` berubah

    // --- Fungsi CRUD (Create, Read, Update, Delete) ---

    // Fungsi untuk MENAMBAH catatan baru
    const addNote = (noteData) => {
        const newNote = {
            id: Date.now(), // ID unik sederhana menggunakan timestamp
            title: noteData.title,
            content: noteData.content,
            createdAt: new Date().toISOString(),
            imageBase64: noteData.imageBase64 || null
        };
        // Tambahkan catatan baru ke awal array `notes`
        setNotes([newNote, ...notes]);
    };

    // Fungsi untuk MEMPERBARUI catatan yang sudah ada
    const updateNote = (id, updatedNote) => {
        setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
    };

    // Fungsi untuk MENGHAPUS catatan
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    // --- Tampilan Komponen ---

    return (
        <div className="app">
            <Header />
            <main className="app-main">
                <NoteForm addNote={addNote} />
                <NotesList
                    notes={notes}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                />
            </main>
        </div>
    );
}

export default App;