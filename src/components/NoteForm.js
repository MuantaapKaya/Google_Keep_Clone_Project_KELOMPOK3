import React, { useState } from 'react';
import './NoteForm.css';
function NoteForm({ addNote }) {
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageBase64, setImageBase64] = useState(null);
    
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Simpan sebagai string Base64
      };
      reader.readAsDataURL(file);
    }
  };

   const handleImageChangeAndExpand = (e) => {
       handleImageChange(e);
       setIsExpanded(true);
   };


    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (title.trim() || content.trim()) {
            addNote({ title, content, imageBase64 });
            setTitle('');
            setContent('');
            setImageBase64(null);
            setIsExpanded(false);
        }
    };
    
    const handleExpand = () => {    
        setIsExpanded(true);
    };

    const handleClose = () => {
        if (!title.trim() && !content.trim() && !imageBase64) {
            setIsExpanded(false);
        }
    };
    
    const removeImage = () => {
        setImageBase64(null);
    };


   return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit}>
        
        
        {isExpanded && imageBase64 && (
          <div className="note-form-image-preview">
            <img src={imageBase64} alt="Preview" />
            <button type="button" onClick={removeImage} className="note-form-image-remove">
              &times;
            </button>
          </div>
        )}

        {isExpanded && (
          <input
            type="text"
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="note-form-input" 
            autoFocus 
          />
        )}
        
        <div className="note-form-main-input">
          <textarea
            placeholder="Take a note..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            onClick={handleExpand} 
            className="note-form-textarea" 
            rows={isExpanded ? 3 : 1} 
          />
          
          
          {!isExpanded && (
            <div className="note-form-collapsed-actions">
              <label className="note-form-icon-btn">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13v-2c0-1.1-.9-2-2-2h-1.17c-.53-1.1-1.63-2-2.83-2s-2.3.9-2.83 2H9c-1.1 0-2 .9-2 2v2H4v7h16v-7h-3zm-6-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2 2zM5 18v-5h1.76c.45-.71 1.09-1.32 1.86-1.76L7.7 13 6 15.52V18H5zm14 0h-1v-2.48L16.3 13l-.92-1.22c.77.44 1.41 1.05 1.86 1.76H19v5z"/></svg>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChangeAndExpand} 
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="note-form-actions">
            {/* MODIFIKASI 10: Ikon upload saat form TERBUKA */}
            <label className="note-form-icon-btn">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13v-2c0-1.1-.9-2-2-2h-1.17c-.53-1.1-1.63-2-2.83-2s-2.3.9-2.83 2H9c-1.1 0-2 .9-2 2v2H4v7h16v-7h-3zm-6-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2 2zM5 18v-5h1.76c.45-.71 1.09-1.32 1.86-1.76L7.7 13 6 15.52V18H5zm14 0h-1v-2.48L16.3 13l-.92-1.22c.77.44 1.41 1.05 1.86 1.76H19v5z"/></svg>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }}
                />
            </label>
            
            <button type="submit" className="note-form-button">
              Add Note
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="note-form-button note-form-button-secondary"
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default NoteForm;