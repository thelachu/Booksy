import { useState } from "react";
import { X } from "lucide-react";
import { addBook } from "../lib/data";
import "./AddBookModal.css";

const AddBookModal = ({ onClose, onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    addBook({
      title: title.trim(),
      author: author.trim(),
      image_url:
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      description: description.trim(),
    });
    onBookAdded();
    onClose();
  };

  return (
    <div className="addbook-overlay" onClick={onClose}>
      <div className="addbook-backdrop" />
      <div
        className="addbook-modal glass-strong"
        onClick={(e) => e.stopPropagation()}>
        <div className="addbook-header">
          <h2 className="addbook-title">Add Book</h2>
          <button onClick={onClose} className="addbook-close-btn">
            <X className="addbook-close-icon" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="addbook-form">
          <div>
            <label className="addbook-label">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="addbook-input"
              placeholder="Book title"
            />
          </div>
          <div>
            <label className="addbook-label">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="addbook-input"
              placeholder="Author name"
            />
          </div>
          <div>
            <label className="addbook-label">Cover Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="addbook-input"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="addbook-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="addbook-input addbook-textarea"
              placeholder="Short description"
            />
          </div>
          <div className="addbook-actions">
            <button
              type="submit"
              disabled={!title.trim() || !author.trim()}
              className="addbook-submit-btn">
              Add Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="addbook-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
