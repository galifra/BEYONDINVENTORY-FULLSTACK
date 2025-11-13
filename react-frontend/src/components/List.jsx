import { useState, useEffect } from 'react';
import Item from './Item';
import EditItemModal from './EditItemModal';
import './List.css';

function List({ items, setItems, searchTerm }) {
  const [editingItem, setEditingItem] = useState(null);
  const [locations, setLocations] = useState([]); // <--- NEW

  // Normalize backend shape → frontend
  const normalizeItem = (item) => ({
    ...item,
    location: item.location?.name || "" // show name only
  });

  // Load items + locations on mount
  useEffect(() => {
    // load items
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => setItems(data.map(normalizeItem)))
      .catch(err => console.error("Error fetching items:", err));

    // load locations
    fetch("http://localhost:8080/api/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error fetching locations:", err));
  }, [setItems]);

  // Filter items
  const filteredItems = Array.isArray(items)
    ? items.filter(i =>
        i?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Delete (frontend-only)
  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // --- SAVE ITEM WITH CORRECT locationId ---
  const handleSaveItem = async (updatedItem) => {
    console.log("Saving updated item:", updatedItem);

    // Find locationId from name
    const matched = locations.find(
      (loc) => loc.name.toLowerCase() === updatedItem.location.toLowerCase()
    );

    if (!matched) {
      alert("Location does not exist. Please create it first.");
      return;
    }

    const payload = {
      name: updatedItem.name,
      description: updatedItem.description,
      locationId: matched.id,   // <--- THE GOLDEN FIX
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/items/${updatedItem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) throw new Error("Failed to update");

      const saved = await response.json();
      const normalized = normalizeItem(saved);

      // update UI
      setItems(prev =>
        prev.map(item =>
          item.id === normalized.id ? normalized : item
        )
      );

      setEditingItem(null);

    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="list-page">
      <h2>Your Items</h2>

      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="item-grid">
          {filteredItems.map(item => (
            <Item
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={setEditingItem}
            />
          ))}
        </div>
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}

export default List;
