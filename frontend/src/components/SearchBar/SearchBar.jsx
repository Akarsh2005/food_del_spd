import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounce logic: Only set the debounced input after 300ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  // Fetch data based on debounced input
  useEffect(() => {
    if (debouncedInput) {
      fetchData(debouncedInput);
    } else {
      setResults([]);  // Clear results if input is empty
      setSuggestions([]); // Clear suggestions
    }
  }, [debouncedInput]);

  const fetchData = async (value) => {
    try {
      const response = await fetch(`http://localhost:4000/api/search/search?query=${encodeURIComponent(value)}`);
      const data = await response.json();
      const filteredResults = data.data; // Adjust this based on your API response structure
      setSuggestions(filteredResults);  // Set suggestions for the dropdown
      setResults(filteredResults);      // Update results in parent component
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectSuggestion = (name) => {
    setInput(name);
    setSuggestions([]);  // Clear suggestions when a suggestion is selected
    setDebouncedInput(name);  // Immediately trigger the search with selected suggestion
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}  // Update input value as user types
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion._id} onClick={() => handleSelectSuggestion(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
