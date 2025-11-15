import './App.css';
import './Galaxy.css';
import Footer from './components/Footer';
import Header from './components/Header';
import List from './components/List';
import AddItem from './components/AddItem';
import Home from './pages/Home';
import Locations from './pages/Locations';
import LocationView from './pages/LocationView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import GalaxyBackground from './components/GalaxyBackground';
import LoginModal from './components/LoginModal';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]); // stores full location objects
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ⭐ LOAD BACKEND DATA ON STARTUP
  useEffect(() => {
    // Load items
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => {
        console.log("RAW ITEMS FROM BACKEND:", data);

        const normalized = data.map(i => ({
          id: i.id,
          name: i.name,
          description: i.description,
          location: i.location?.name || ""
        }));

        console.log("NORMALIZED ITEMS:", normalized);
        setItems(normalized);
      })
      .catch(err => console.error("Error loading items:", err));

    // Load locations
    fetch("http://localhost:8080/api/locations")
      .then(res => res.json())
      .then(data => {
        console.log("RAW LOCATIONS FROM BACKEND:", data);
        setLocations(data); // KEEP FULL LOCATION OBJECTS
      })
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // ⭐ REAL addItem — sends to backend properly
  const addItem = async (newItem) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const foundLocation = locations.find(
        loc => loc.name.toLowerCase() === newItem.location.toLowerCase()
      );

      if (!foundLocation) {
        alert("Location must exist before adding an item.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItem.name,
          description: newItem.description,
          locationId: foundLocation.id
        })
      });

      if (!response.ok) throw new Error("Failed to save item");

      const saved = await response.json();

      const normalized = {
        id: saved.id,
        name: saved.name,
        description: saved.description,
        location: saved.location.name
      };

      setItems(prev => [...prev, normalized]);

    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // ⭐ Add location to backend
  const handleAddLocation = async (newLocation) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }

    try {
      const response = await fetch("http://localhost:8080/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newLocation })
      });

      if (!response.ok) throw new Error("Failed to save location");

      const saved = await response.json();
      setLocations(prev => [...prev, saved]);

      return true;
    } catch (err) {
      console.error("Error adding location:", err);
      return false;
    }
  };

  return (
    <Router>
      <GalaxyBackground />
      <Header />

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          />
          <Route
            path="/list"
            element={<List items={items} setItems={setItems} searchTerm={searchTerm} />}
          />
          <Route
            path="/add"
            element={<AddItem addItem={addItem} locations={locations} />}
          />
          <Route
            path="/locations"
            element={
              <Locations
                locations={locations}
                items={items}
                isLoggedIn={isLoggedIn}
                onAddLocation={handleAddLocation}
                setShowLoginModal={setShowLoginModal}
              />
            }
          />
          <Route
            path="/location/:name"
            element={<LocationView items={items} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />
    </Router>
  );
}

export default App;
