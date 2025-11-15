import './Locations.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditLocationModal from '../components/EditLocationModal';

function Locations({ items, locations, isLoggedIn, onAddLocation, setShowLoginModal }) {
  const navigate = useNavigate();

  const [editingLocation, setEditingLocation] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // stores location to delete

  // 🔥 DELETE LOCATION
  const handleDeleteLocation = async (loc) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // Prevent deleting if items exist in location
    const itemsHere = items.filter((item) => item.location === loc.name);
    if (itemsHere.length > 0) {
      alert("Cannot delete a location that still has items stored in it.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/locations/${loc.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      window.location.reload(); // simplest refresh for now

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔥 SAVE EDITED LOCATION
  const handleSaveLocation = async (updated) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/locations/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updated.name }),
      });

      if (!res.ok) throw new Error("Failed to update");

      window.location.reload(); // simplest refresh for now
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="locations">
      <h2>Locations</h2>

      <div className="location-grid">
        {locations.length === 0 && <p>No locations added yet.</p>}

        {locations.map((loc) => {
          const itemsHere = items.filter((item) => item.location === loc.name);
          const previewItems = itemsHere.slice(0, 3);

          return (
            <div key={loc.id} className="location-wrapper">

              <button
                className="location-card"
                onClick={() =>
                  navigate(`/location/${encodeURIComponent(loc.name)}`)
                }
                type="button"
              >
                <h3>{loc.name}</h3>

                {itemsHere.length === 0 ? (
                  <p>No items stored here.</p>
                ) : (
                  <ul>
                    {previewItems.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                    {itemsHere.length > 3 && <li>...and more</li>}
                  </ul>
                )}
              </button>

              {/* ACTION BUTTONS */}
              <div className="location-actions">
                <button onClick={() => setEditingLocation(loc)}>Edit</button>
                <button onClick={() => setShowDeleteConfirm(loc)}>Delete</button>
              </div>

            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {editingLocation && (
        <EditLocationModal
          location={editingLocation}
          onClose={() => setEditingLocation(null)}
          onSave={handleSaveLocation}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete Location?</h3>
            <p>
              Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>?
            </p>

            <div className="modal-buttons">
              <button
                onClick={() => handleDeleteLocation(showDeleteConfirm)}
                className="danger"
              >
                Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Locations;
