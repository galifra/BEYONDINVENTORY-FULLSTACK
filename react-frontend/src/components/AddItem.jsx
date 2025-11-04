import { useState } from 'react';
import Button from './Button';
import './AddItem.css';

function AddItem({ addItem, locations }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [useCustomLocation, setUseCustomLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    addItem({ name: name.trim(), location: location.trim(), description: description.trim() });
    setName('');
    setLocation('');
    setDescription('');
    setUseCustomLocation(false);
  };

  const handleToggleCustomLocation = () => {
    setUseCustomLocation(prev => !prev);
    setLocation(''); // Reset location input when toggling
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {useCustomLocation ? (
          <input
            type="text"
            placeholder="Enter new location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        ) : (
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        )}

        <div className="location-toggle">
          <label>
            <input
              type="checkbox"
              checked={useCustomLocation}
              onChange={handleToggleCustomLocation}
            />
            Add new location
          </label>
        </div>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit">Add Item</Button>
      </form>
    </div>
  );
}

export default AddItem;
