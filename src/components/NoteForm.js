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
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
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