import { useState, useEffect } from "react";
import Item from "./Item";
import EditItemModal from "./EditItemModal";
import "./List.css";

function List({ items, setItems, searchTerm }) {
  const [editingItem, setEditingItem] = useState(null);
  const [locations, setLocations] = useState([]);

  // Normalize backend → frontend shape
  const normalizeItem = (item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    location: item.location?.name || "",
  });

  // Load items + locations from backend
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

  // Filter list
  const filteredItems = Array.isArray(items)
    ? items.filter((i) =>
        i?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // DELETE (backend + frontend)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/items/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete item");

      // update UI
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // UPDATE ITEM (PUT + state update)
  const handleSaveItem = async (updatedItem) => {
    // Find matching location by NAME
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
      locationId: matched.id, // THIS is what backend wants
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

      // update UI
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
