// src/components/EditItemModal.jsx
import { useState, useEffect } from "react";

function EditItemModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });

  // Preload existing data
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        location: item.location || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...item, ...formData });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemModal;
