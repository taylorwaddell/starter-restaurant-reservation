import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    party_size: 0,
  });
  const [errors, setErrors] = useState([]);
  const displayErrors = () => {
    return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
  }


  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // insert API submit sauce here
    if (valiDate()) {
      history.push(
        `/dashboard?date=${formData.reservation_date}`
      );
    }
  }
  function valiDate() {
    const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
    const todaysDate = new Date();
    const foundErrors = [];
    
    console.log(reserveDate.getDay());
    if (reserveDate.getDay() === 1) {
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({ message: "Reservation time cannot be in the past." });
    }

    setErrors(foundErrors);
    if (foundErrors.length > 0) return false;
    return true;
  }


  return (
    <form>
      {displayErrors()}
      <label htmlFor="first-name">First Name</label>
      <input
        name="first_name"
        id="first_name"
        type="text"
        onChange={handleChange}
        value={formData.first_name}
        required
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        name="last_name"
        id="last_name"
        type="text"
        onChange={handleChange}
        value={formData.last_name}
        required
      />
      <label htmlFor="mobile-number">Mobile Number</label>
      <input
        name="mobile_number"
        id="mobile_number"
        type="tel"
        onChange={handleChange}
        value={formData.mobile_number}
        required
      />
      <label htmlFor="reservation-date">Reservation Date</label>
      <input
        name="reservation_date"
        id="reservation_date"
        type="date"
        onChange={handleChange}
        value={formData.reservation_date}
        required
      />
      <label htmlFor="reservation-time">Reservation Time</label>
      <input
        name="reservation_time"
        id="reservation_time"
        type="time"
        onChange={handleChange}
        value={formData.reservation_time}
        required
      />
      <label htmlFor="party-size">Party Size</label>
      <input
        name="party_size"
        id="party_size"
        type="number"
        onChange={handleChange}
        value={formData.party_size}
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}

export default NewReservation;
