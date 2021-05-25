import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";
import { listTables, updateTable, readReservation } from "../utils/api";
import customStyle from "../customStyle";

export default function Seating() {
  const [formData, setFormData] = useState("Select a table.");
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservation, setReservation] = useState([]);
  const [reservationError, setReservationError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setTablesError(null);
      setReservationError(null);
      try {
        const listedTables = await listTables(abortController.signal);
        setTables(listedTables);
        const reserved = await readReservation(reservation_id);
        setReservation(reserved);
      } catch (err) {
        setTablesError({ message: err.response.data.error });
        setReservationError({ message: err.response.data.error });
      }
      return () => abortController.abort();
    }
    loadDashboard();
  }, [reservation_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData === "Select a table.")
        throw new Error("Select a table.");
      await updateTable(formData, { data: { reservation_id } });
      history.push("/dashboard");
    } catch (error) {
      if (error.response)
        setTablesError({ message: error.response.data.error });
        if(!error.response) setTablesError(error)
    }
  };
  const handleChange = (event) => {
    setFormData(event.target.value);
  };
  const handleCancel = () => {
    setFormData("Select a table.");
    history.goBack();
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <form
          action=""
          onSubmit={handleSubmit}
          className="d-flex flex-column justify-content-center"
        >
          <label htmlFor="table_id">
            <select
              id="table_id"
              name="table_id"
              onChange={handleChange}
              value={formData}
              className="bg-secondary text-white p-1 border rounded border-secondary"
            >
              <option>Select a table.</option>
              {tables.map((table) => {
                return (
                  <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                );
              })}
            </select>
          </label>
          <button type="submit" className="btn btn-sm" style={customStyle.bg}>
            Submit
          </button>
        <button
          onClick={handleCancel}
          className="mb-5 mt-2 btn btn-sm"
          style={customStyle.bgBad}
        >
          Cancel
        </button>
        </form>
        {reservation.reservation_time && (
          <Reservation reservation={reservation} type="seating" />
        )}
        <ErrorAlert error={tablesError} />
        <ErrorAlert error={reservationError} />
      </div>
    </>
  );
}