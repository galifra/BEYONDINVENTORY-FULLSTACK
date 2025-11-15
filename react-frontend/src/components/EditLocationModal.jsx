// src/components/EditLocationModal.jsx
import { useState, useEffect } from "react";

function EditLocationModal({ location, onClose, onSave }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (location) {
      setName(location.name || "");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Location name cannot be empty.");
      return;
    }

    onSave({ id: location.id, name: name.trim() });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Location</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Location Name"
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

export default EditLocationModal;
