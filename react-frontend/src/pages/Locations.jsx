import './Locations.css';
import { useNavigate } from 'react-router-dom';

function Locations({ items, locations }) {
  const navigate = useNavigate();

  return (
    <div className="locations">
      <h2>Locations</h2>

      <div className="location-grid">
        {locations.length === 0 && <p>No locations added yet.</p>}

        {locations.map((loc, index) => {
          const itemsHere = items.filter(item => item.location === loc);
          const previewItems = itemsHere.slice(0, 3); // show up to 3 items as preview

          return (
            <button
              key={index}
              className="location-card"
              onClick={() => navigate(`/location/${encodeURIComponent(loc)}`)}
              type="button"
            >
              <h3>{loc}</h3>
              {itemsHere.length === 0 ? (
                <p>No items stored here.</p>
              ) : (
                <ul>
                  {previewItems.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                  {itemsHere.length > 3 && <li>...and more</li>}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Locations;
