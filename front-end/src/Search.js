import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Search() {
  const [searchNumber, setSearchNumber] = useState();
  const history = useHistory();

  function handleChange({ target }) {
    setSearchNumber(target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // insert API submit sauce here
    history.push(`/reservations?mobile_phone=${searchNumber}`);
  }
  return (
    <main>
      <label htmlFor="mobile-number">Mobile Number</label>
      <input
        name="mobile_number"
        id="mobile_number"
        type="tel"
        onChange={handleChange}
        value={searchNumber}
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Find
      </button>
    </main>
  );
}

export default Search;
