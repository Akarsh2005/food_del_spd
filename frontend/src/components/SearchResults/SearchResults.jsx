import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Use React Router for managing location
import './SearchResults.css';
import addIcon from '../../assets/add_icon_white.png';
import removeIcon from '../../assets/remove_icon_red.png';
import { StoreContext } from '../../Context/StoreContext';

const SearchResults = () => {
  const [results, setResults] = useState({ foodItems: [], restaurants: [] });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // Avoid fetching if the query is empty

      try {
        const response = await axios.get(`${url}/api/search/search`, {
          params: { query }
        });
        setResults(response.data.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query, url]);

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleRestaurantClick = (restaurantId) => {
    const filteredFoodItems = results.foodItems.filter(item => item.restaurantId._id === restaurantId);
    setSelectedRestaurant({ id: restaurantId, foodItems: filteredFoodItems });
  };

  return (
    <div className="search-results">
      <h1>Search Results for: {query}</h1>
      
      {selectedRestaurant ? (
        <>
          <h2>Food Items for Restaurant: {results.restaurants.find(r => r._id === selectedRestaurant.id)?.name || 'Unknown'}</h2>
          {selectedRestaurant.foodItems.length ? (
            <ul>
              {selectedRestaurant.foodItems.map(item => (
                <li key={item._id} className="search-result-item">
                  <div className="search-result-image-container">
                    <img className="search-result-image" src={`${url}/images/${item.image}`} alt={item.name} />
                    <div className="search-result-icon-container">
                      {!cartItems[item._id] ? (
                        <img className="add-icon" src={addIcon} alt="Add Icon" onClick={() => handleAddToCart(item._id)} />
                      ) : (
                        <div className="food-item-counter">
                          <img src={removeIcon} alt="Remove Icon" onClick={() => handleRemoveFromCart(item._id)} />
                          <p>{cartItems[item._id]}</p>
                          <img className="add-icon" src={addIcon} alt="Add Icon" onClick={() => handleAddToCart(item._id)} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{currency}{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No food items available for this restaurant.</p>
          )}
          <button onClick={() => setSelectedRestaurant(null)}>Back to all results</button>
        </>
      ) : (
        <>
          <h2>Restaurants</h2>
          {results.restaurants.length ? (
            <ul>
              {results.restaurants.map(restaurant => (
                <li key={restaurant._id} onClick={() => handleRestaurantClick(restaurant._id)}>
                  {restaurant.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No restaurants found.</p>
          )}
          
          <h2>Food Items</h2>
          {results.foodItems.length ? (
            <ul>
              {results.foodItems.map(item => (
                <li key={item._id} className="search-result-item">
                  <div className="search-result-image-container">
                    <img className="search-result-image" src={`${url}/images/${item.image}`} alt={item.name} />
                    <div className="search-result-icon-container">
                      {!cartItems[item._id] ? (
                        <img className="add-icon" src={addIcon} alt="Add Icon" onClick={() => handleAddToCart(item._id)} />
                      ) : (
                        <div className="food-item-counter">
                          <img src={removeIcon} alt="Remove Icon" onClick={() => handleRemoveFromCart(item._id)} />
                          <p>{cartItems[item._id]}</p>
                          <img className="add-icon" src={addIcon} alt="Add Icon" onClick={() => handleAddToCart(item._id)} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{currency}{item.price}</p>
                    <p>{item.restaurantId.name}</p> {/* Show associated restaurant name */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No food items found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
