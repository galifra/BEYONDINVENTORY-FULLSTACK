import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

function Home({ searchTerm, setSearchTerm }) { 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to /list page when user submits the search
    if (searchTerm.trim()) {
      navigate('/list');
    }
  };

  return (
    <div className="home">
      <h2>Welcome to Beyond Inventory</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search your items..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Button type="submit" className="search-button">
          Search
        </Button>
      </form>
      <div className="button-group">
        <Button onClick={() => navigate('/add')} className="add-button">
          Add Item
        </Button>
        <Button onClick={() => navigate('/locations')} className="locations-button">
          Locations
        </Button>
      </div>
    </div>
  );
}

export default Home;
