import { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./ReservationCard";
import customStyle from "../customStyle";
import searchCon from "./imgs/searchCon.svg";

export default function Search() {
  const [mobile_number, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const reservationCards = reservations.map((reservation, index) => {
    return <Reservation reservation={reservation} key={index} />;
  });

  const handleChange = (e) => setMobileNumber(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();

    const abortController = new AbortController();

    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .then(() =>
        reservationCards.length === 0
          ? setReservationsError({ message: "No reservations found" })
          : setReservationsError(null)
      )
      .catch(setReservationsError);
  };

  return (
    <>
      <h2 className="text-center pb-2 text-white">
        Search Current Reservation
      </h2>
      <div className="d-flex flex-column align-items-center">
        <form
          onSubmit={handleSearch}
          className="form-floating mt-3 w-50 text-center"
        >
          <div className="input-group">
            <input
              name="mobile_number"
              placeholder="Enter phone number."
              type="tel"
              onChange={handleChange}
              className="form-control bg-secondary border-secondary text-white"
              aria-describedby="find-button"
              required
            />
            <div class="input-group-append">
              <button
                type="submit"
                id="find-button"
                className="btn mb-5"
                style={customStyle.bg}
              >
                <img src={searchCon} alt="search" />
              </button>
            </div>
          </div>
        </form>
        {reservationCards.length !== 0 ? (
          <h3 className="text-white">Reservations</h3>
        ) : (
          ""
        )}
        {reservationCards.length === 0 ? (
          <ErrorAlert error={reservationsError} />
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center flex-wrap mb-5">
          {reservationCards}
        </div>
      </div>
    </>
  );
}
