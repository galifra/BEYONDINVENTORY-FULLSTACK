import { useState } from 'react';
import "./Item.css";


function Item({ item, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="item-card">
      {/* ✏️ edit icon moved to top-right corner */}
      <button
        className="edit-icon"
        title="Edit item"
        onClick={() => onEdit(item)}
      >
        ✏️
      </button>

      <h3>{item.name}</h3>

      {showDetails && (
        <div className="item-details">
          <p><strong>Location:</strong> {item.location}</p>
          <p>{item.description}</p>
        </div>
      )}

      <button
        className="details-button"
        onClick={() => setShowDetails(prev => !prev)}
      >
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      <button
        className="delete-button"
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Item;
