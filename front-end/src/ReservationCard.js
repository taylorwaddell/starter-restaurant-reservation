import React from 'react';
import { useHistory, Link } from "react-router-dom";

function ReservationCard({ reservation }) {
    const history = useHistory();

    const {
		reservation_id,
		first_name,
		last_name,
		people,
		reservation_time,
		mobile_number,
		status,
	} = reservation;

    function cancelReservation(){
        window.confirm("Do you want to cancel this reservation? This cannot be undone.")
        // if true update status of reservation to cancelled
    }

    return (
        <div>
            <div className="card-header">
                <h4>reservation time here</h4>
                <h6>reservation Status here</h6>
            </div>
            <div className="card-body">
                <h6 className="card-title">
                    last name, first name
                </h6>
                <p>555-5555</p>
                <h5>people: X</h5>
            </div>
            {status === "booked" ? (
				<>
					<Link
						to={`/reservations/${reservation.reservation_id}/seat`}
						className="btn btn-outline-success"
					>
						Seat
					</Link>
					<Link
						to={`/reservations/${reservation.reservation_id}/edit`}
						className="btn btn-outline-warning"
					>
						Edit
					</Link>
					<button
						data-reservation-id-cancel={reservation_id}
						className="btn btn-outline-danger"
						onClick={cancelReservation}
					>
						Cancel
					</button>
				</>
			) : null}
        </div>
    )
}

export default ReservationCard
