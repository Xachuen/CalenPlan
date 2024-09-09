import React, { useState } from "react";

import styles from "./AddressSearchBar.module.css";

import { v4 as uuidv4 } from "uuid";

const AddressSearchBar = ({ clickAddress, searchSessionData }) => {
  const [searchSession, setSearchSession] = searchSessionData;
  const [searchedAddress, setSearchedAddress] = useState(""); // Limited to component to be used in input
  const [searchResults, setSearchResults] = useState([]); // Limited to component
  const [showDropDown, setShowDropDown] = useState(false); // Limited to component

  const generateSession = () => {
    if (!searchSession) {
      const newSessionToken = uuidv4();
      console.log(newSessionToken);
      setSearchSession(newSessionToken);
    }
  };

  const fetchSuggestions = async (searchTerm) => {
    // Example call to Mapbox API or any other API
    const accessToken = import.meta.env.VITE_MAPBOX_KEY;
    const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(searchTerm)}&access_token=${accessToken}&session_token=${searchSession}&types=address`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data.suggestions || [];
    } catch {
      console.log("Can not retrieve from API.");
      return [];
    }
  };

  const searchAddressCompletion = async (event) => {
    setSearchedAddress(event.target.value);
    if (event.target.value) {
      const results = await fetchSuggestions(event.target.value);
      if (results.length > 0) {
        setShowDropDown(true);
      }
      setSearchResults(results);
    }
  };

  const blurAddressInput = () => {
    setTimeout(() => {
      setSearchResults([]);
      setShowDropDown(false);
    }, 100);
  };

  return (
    <div className={styles.AddressInput}>
      <input
        type="text"
        value={searchedAddress}
        onChange={(event) => {
          searchAddressCompletion(event);
        }}
        onFocus={() => generateSession()}
        onBlur={blurAddressInput}
      />
      {showDropDown && (
        <ul className={styles.AddressSuggestions}>
          {searchResults.map((placeObj) => {
            return (
              <li
                key={placeObj.mapbox_id}
                onClick={() => {
                  setSearchedAddress(placeObj.address);
                  clickAddress(placeObj);
                }}
              >
                {placeObj.address}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AddressSearchBar;
