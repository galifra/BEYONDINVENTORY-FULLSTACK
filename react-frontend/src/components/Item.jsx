import { useState } from 'react';

function Item({ item, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="item-card">
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
      {/* New Delete Button */}
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
