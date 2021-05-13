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
  };

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = [];
    // insert API submit sauce here
    if (valiDate(foundErrors) && validateFields(foundErrors)) {
      history.push(`/dashboard?date=${formData.reservation_date}`);
    }
    setErrors(foundErrors);
  }
  function valiDate(foundErrors) {
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();


    console.log(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
    console.log(reserveDate, todaysDate);

    if (reserveDate.getDay() === 2) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed on Tuesdays.",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }

    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    }

    else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    }

    else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }

    

    if (foundErrors.length > 0) {
      return false;
    }
    return true;
  }
  function validateFields(foundErrors) {
    for(const field in formData) {
      if(formData[field] === "") {
        foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
      }
    }
  
    if(formData.people <= 0) {
      foundErrors.push({ message: "Party must be a size of at least 1." })
    }
  
    if(foundErrors.length > 0) {
      return false;
    }
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
