import { useState } from 'react';
import Item from './Item';
import EditItemModal from './EditItemModal'; // ✅ new import
import './List.css'; // add CSS for styling

function List({ items, setItems, searchTerm }) {
  const [editingItem, setEditingItem] = useState(null); // ✅ track which item is being edited

  const filteredItems = Array.isArray(items)
    ? items.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (id) => {
    console.log("DELETE REQUEST FOR ID:", id); // ✅ debug log added
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // ✅ New: handle saving edited item
  const handleSaveItem = (updatedItem) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
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
            console.log("ITEM DATA:", item); // ✅ debug log correctly here
            return (
              <Item
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={setEditingItem} // ✅ pass edit handler
              />
            );
          })}
        </div>
      )}

      {/* ✅ Conditionally render modal */}
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
