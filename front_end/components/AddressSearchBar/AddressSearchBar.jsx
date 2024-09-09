import React from "react";

import styles from "./AddressSearchBar.module.css";

const AddressSearchBar = ({ searchResults, clickAddress }) => {
  const [searchSession, setSearchSession] = useState("");
  const [searchedAddress, setSearchedAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const generateSession = () => {
    if (!searchSession) {
      const newSessionToken = uuidv4();
      console.log(newSessionToken);
      setSearchSession(newSessionToken);
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
                onClick={() => clickAddress(placeObj)}
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
