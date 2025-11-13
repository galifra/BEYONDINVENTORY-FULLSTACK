import { useState, useEffect } from 'react';
import Item from './Item';
import EditItemModal from './EditItemModal';
import './List.css';

function List({ items, setItems, searchTerm }) {
  const [editingItem, setEditingItem] = useState(null);

  // 🔧 Normalize backend shape → frontend shape
  const normalizeItem = (item) => ({
    ...item,
    location: typeof item.location === "object"
      ? item.location.name
      : item.location
  });

  // 📡 Load items from backend on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => {
        console.log("Loaded items from backend:", data);

        // Normalize all items
        const normalized = data.map(normalizeItem);
        setItems(normalized);
      })
      .catch(err => console.error("Error fetching items:", err));
  }, [setItems]);

  // 🔍 Filter items by search term
  const filteredItems = Array.isArray(items)
    ? items.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 🗑️ Delete handler (frontend only for now)
  const handleDelete = (id) => {
    console.log("DELETE REQUEST FOR ID:", id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // 💾 Save edited item
  const handleSaveItem = (updatedItem) => {
    const normalized = normalizeItem(updatedItem); // ensure location is a string

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === normalized.id ? normalized : item
      )
    );

    setEditingItem(null);
  };

  return (
    <div className="list-page">
      <h2>Your Items</h2>

      {filteredItems.length === 0 ? (
        <p>No items found. Try searching something else or add new items!</p>
      ) : (
        <div className="item-grid">
          {filteredItems.map(item => {
            console.log("ITEM DATA:", item);
            return (
              <Item
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={setEditingItem}
              />
            );
          })}
        </div>
      )}

      {/* ✏️ Edit modal */}
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
