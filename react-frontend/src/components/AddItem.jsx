import { useState } from 'react';
import Button from './Button';
import './AddItem.css';

function AddItem({ addItem, locations }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [useCustomLocation, setUseCustomLocation] = useState(false);

  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!name.trim()) {
      setNameError('Item name is required.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!location.trim()) {
      setLocationError('Location is required.');
      hasError = true;
    } else {
      setLocationError('');
    }

    if (hasError) return;

    addItem({
      name: name.trim(),
      location: location.trim(),
      description: description.trim(),
    });

    setName('');
    setLocation('');
    setDescription('');
    setUseCustomLocation(false);
  };

  const handleToggleCustomLocation = () => {
    setUseCustomLocation(!useCustomLocation);
    setLocation('');
    setLocationError('');
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError && e.target.value.trim()) setNameError('');
          }}
          className={nameError ? 'input-error' : ''}
        />
        {nameError && <p className="error-text">{nameError}</p>}

        {/* LOCATION */}
        {useCustomLocation ? (
          <input
            type="text"
            placeholder="Enter new location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (locationError && e.target.value.trim()) setLocationError('');
            }}
            className={locationError ? 'input-error' : ''}
          />
        ) : (
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (locationError && e.target.value.trim()) setLocationError('');
            }}
            className={locationError ? 'input-error' : ''}
          >
            <option value="">Select location</option>

            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        )}

        {locationError && <p className="error-text">{locationError}</p>}

        {/* TOGGLE */}
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

        {/* DESCRIPTION */}
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
