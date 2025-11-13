// src/components/EditItemModal.jsx
import { useState, useEffect } from "react";

function EditItemModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locationName: "",
    locationId: null
  });

  // Load initial form values
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        locationName: item.location || "",   // display name
        locationId: item.locationId || item.location_id || item.locationId // may not exist yet
      });
    }
  }, [item]);

  // Generic change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting updated item:", formData);

    // 🚨 IMPORTANT:
    // User edited the location NAME in a text field.
    // But backend needs locationId — the numeric ID.
    //
    // So call the parent save handler with:
    // { id, name, description, locationId }
    //
    // NOTE: Backend currently requires locationId.
    // We will FIND the locationId by name in List.jsx or here.

    onSave({
      id: item.id,
      name: formData.name,
      description: formData.description,
      locationId: formData.locationId, // must be set by parent
      location: formData.locationName
    });
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

          {/* User edits location NAME, parent will resolve locationId */}
          <input
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
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

export default EditItemModal;
