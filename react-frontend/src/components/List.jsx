import { useState, useEffect } from "react";
import Item from "./Item";
import EditItemModal from "./EditItemModal";
import "./List.css";

function List({ items, setItems, searchTerm }) {
  const [editingItem, setEditingItem] = useState(null);
  const [locations, setLocations] = useState([]);

  // Normalize backend → frontend shape
  const normalizeItem = (item) => ({
    ...item,
    location: item.location?.name || "",
  });

  // Load items and locations from backend
  useEffect(() => {
    // Load items
    fetch("http://localhost:8080/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.map(normalizeItem)))
      .catch((err) => console.error("Error fetching items:", err));

    // Load locations
    fetch("http://localhost:8080/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, [setItems]);

  // Filter by search
  const filteredItems = Array.isArray(items)
    ? items.filter((i) =>
        i?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Delete (frontend only)
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Save updated item (PUT)
  const handleSaveItem = async (updatedItem) => {
    // Find matching location
    const matched = locations.find(
      (loc) =>
        loc.name.toLowerCase() === updatedItem.location.toLowerCase()
    );

    if (!matched) {
      alert("Location does not exist. Please create it first.");
      return;
    }

    const payload = {
      name: updatedItem.name,
      description: updatedItem.description,
      locationId: matched.id,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/items/${updatedItem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to update item");

      const saved = await response.json();
      const normalized = normalizeItem(saved);

      // Update UI
      setItems((prev) =>
        prev.map((item) =>
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
          {filteredItems.map((item) => (
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
