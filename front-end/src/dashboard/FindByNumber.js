import { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";

export default function FindByNumber() {
  const [mobile_number, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const reservationsContent = reservations.map((reservation, index) => {
    return <Reservation reservation={reservation} key={index} />;
  });

  const handleChange = (e) => setMobileNumber(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();

    const abortController = new AbortController();

    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .then(() =>
        reservationsContent.length === 0
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
              onChange={handleChange}
              className="form-control"
              aria-describedby="find-button"
              required
            />
            <div class="input-group-append">
              <button
                type="submit"
                id="find-button"
                className="btn btn-primary mb-5"
              >
                <span className="oi oi-magnifying-glass" />
              </button>
            </div>
          </div>
        </form>
        {reservationsContent.length !== 0 ? (
          <h3 className="text-white">Reservations</h3>
        ) : (
          ""
        )}
        {reservationsContent.length === 0 ? (
          <ErrorAlert error={reservationsError} />
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center flex-wrap mb-5">
          {reservationsContent}
        </div>
      </div>
    </>
  );
}
