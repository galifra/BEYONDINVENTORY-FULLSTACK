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
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Successful login callback
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

    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), ...newItem }
    ]);

    // Auto-add location if it’s new
    if (newItem.location && !locations.includes(newItem.location)) {
      setLocations(prev => [...prev, newItem.location]);
    }
  };

  // Add location handler with login check
  const handleAddLocation = (newLocation) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }

    if (newLocation && !locations.includes(newLocation)) {
      setLocations(prev => [...prev, newLocation]);
      return true;
    }

    return false;
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
