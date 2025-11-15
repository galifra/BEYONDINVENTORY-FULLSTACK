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
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ⭐ LOAD BACKEND DATA ON STARTUP
  useEffect(() => {
    // Load items
    fetch("http://localhost:8080/api/items")
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(i => ({
          id: i.id,
          name: i.name,
          description: i.description,
          location: i.location?.name || ""
        }));
        setItems(normalized);
      })
      .catch(err => console.error("Error loading items:", err));

    // Load locations
    fetch("http://localhost:8080/api/locations")
      .then(res => res.json())
      .then(data => {
        setLocations(data.map(loc => loc.name));
      })
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // Add item handler with login check
  const addItem = (newItem) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setItems((prevItems) => {
      const updated = [...prevItems, { id: Date.now(), ...newItem }];
      console.log("Items AFTER add:", updated);
      return updated;
    });

    if (newItem.location && !locations.includes(newItem.location)) {
      setLocations((prev) => [...prev, newItem.location]);
    }
  };

  // Add location handler with backend POST
  const handleAddLocation = async (newLocation) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }

    try {
      const response = await fetch("http://localhost:8080/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newLocation }),
      });

      if (!response.ok) throw new Error("Failed to save location");

      const saved = await response.json();
      setLocations((prev) => [...prev, saved.name]);

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
