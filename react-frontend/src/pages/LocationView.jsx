import { useParams } from 'react-router-dom';

function LocationView({ items }) {
  const { name } = useParams();
  const locationItems = items.filter(item => item.location === name);

  return (
    <div className="location-view">
      <h2>Items in: {name}</h2>
      {locationItems.length === 0 ? (
        <p>No items found in this location.</p>
      ) : (
        <div className="item-grid">
          {locationItems.map(item => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationView;
