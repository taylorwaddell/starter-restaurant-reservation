import { Link } from "react-router-dom";
import { updateStatus } from "../utils/api";
import { formatDate, formatTime, formatPhone } from "../utils/date-time";
import groupCon from "./resCons/groupCon.svg";
import customStyle from "../customStyle";

export default function Reservation({ reservation, type }) {
  const date = formatDate(reservation.reservation_date);
  const time = formatTime(reservation.reservation_time);
  const phone = formatPhone(reservation.mobile_number);


  const handleCancel = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? \n \n \nThis cannot be undone."
      )
    ) {
      try {
        await updateStatus(reservation.reservation_id, {
          data: { status: "cancelled" },
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="card m-3 rounded bg-secondary" style={{ width: "20rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title" style={customStyle.text}>
              {reservation.first_name} {reservation.last_name}
            </h4>
            <h6 className="text-dark">
              <img src={groupCon} alt="party size" />
              {reservation.people}
            </h6>
          </div>

          <div className="d-flex justify-content-between text-dark">
            <h6>{date}</h6>
            <h6>{time}</h6>
          </div>
          <div className="d-flex justify-content-between mb-4 text-dark">
            <h6>{phone}</h6>

            <h5 data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </h5>
          </div>

          {reservation.status === "booked" && !type ? (
            <>
              <Link
                to={`/reservations/${reservation.reservation_id}/seat`}
                className="btn btn-sm"
                style={customStyle.bg}
              >
                Seat
              </Link>
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                className="mx-3 btn btn-sm"
                onClick={handleCancel}
                style={customStyle.bgBad}
              >
                Cancel
              </button>
              <Link
                to={`/reservations/${reservation.reservation_id}/edit`}
                className="btn btn-dark btn-sm"
              >
                Edit
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}