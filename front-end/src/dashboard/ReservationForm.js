import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import customStyle from "../customStyle";
import ErrorAlert from "../layout/ErrorAlert";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";

function ReservationForm({ type }) {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  useEffect(() => {
    if (type === "Edit") {
      const loadForm = async () => {
        const newRes = await readReservation(reservation_id);
        setFormData({
          ...newRes,
          reservation_date: newRes.reservation_date.slice(0, 10),
        });
      };
      loadForm();
    }
  }, [type, reservation_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newDate = new Date(
      `${formData.reservation_date} ${formData.reservation_time}`
    );
    let currentDay = new Date();
    try {
      if (newDate.getDay() === 2)
        throw new Error("Reservations cannot be made on Tuesday. Restaurant is closed.");
      if (newDate < currentDay) throw new Error("Reservations cannot be made in the past");
      let time = Number(formData.reservation_time.replace(":", ""));
      if (time < 1030 || time > 2130)
        throw new Error(
          "Reservations can only be made between 10:30 AM to 9:30 PM."
        );
      if (type === "Edit") {
        await updateReservation(reservation_id, { data: formData });
      } else {
        await createReservation({ data: formData });
      }
      setFormData({ ...initialState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (err) {
      if(err.response) setReservationsError({ message: err.response.data.error })
      if(!err.response)setReservationsError(err);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center ">
      <h2 className="text-center pb-2 text-white">{type} Reservation</h2>
      <form className=" form-floating border-radius p-3 px-5 rounded bg-secondary" action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name" className="form-label text-white">
            First name:
            <input
              className="form-control bg-dark border-dark text-white"
              id="first_name"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="form-label text-white">
            Last name:
            <input
              className="form-control bg-dark border-dark text-white"
              id="last_name"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number" className="form-label text-white">
            Phone number:
            <input
              className="form-control bg-dark border-dark text-white"
              id="mobile_number"
              type="tel"
              pattern="(1?)\(?([0-9]{3})?\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})"
              name="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date" className="form-label text-white">
            Date:
            <input
              className="form-control bg-dark border-dark text-white"
              id="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              name="reservation_date"
              onChange={handleChange}
              value={formData.reservation_date}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time" className="form-label text-white">
            Time:
            <input
              className="form-control bg-dark border-dark text-white"
              id="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              name="reservation_time"
              onChange={handleChange}
              value={formData.reservation_time}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="people" className="form-label text-white">
            Number of guests:
            <input
              className="form-control bg-dark border-dark text-white"
              id="people"
              type="number"
              min="1"
              max="25"
              name="people"
              onChange={handleChange}
              value={formData.people}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-sm" style={customStyle.bg}>Submit</button>
          <button className="mx-3 btn btn-sm" style={customStyle.bgBad} onClick={() => history.goBack()}>
            Cancel
          </button>
          <button className="btn btn-sm" style={customStyle.bgYell} onClick={() => setFormData(initialState)}>Reset</button>
        </div>
      </form>
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default ReservationForm;