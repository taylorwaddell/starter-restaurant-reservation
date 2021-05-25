import { useState } from "react";
import { useHistory } from "react-router-dom";
import customStyle from "../customStyle";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function Tables() {
  const history = useHistory();
  const initialState = {
    table_name: "",
    capacity: 0,
  };
  const [formData, setFormData] = useState({ ...initialState });
  const [tablesError, setTablesError] = useState(null);
  const handleChange = ({ target }) => {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("form", formData);
      await createTable({ data: formData });
      setFormData({ ...initialState });
      history.push(`/dashboard`);
    } catch (err) {
      setTablesError({ message: err.response.data.error });
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center text-white pb-2">Create a New Table</h2>
        <form action="" onSubmit={handleSubmit} className="card bg-secondary">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="first_name" className="text-white form-label">
                Table name:
                <input
                  className="form-control bg-dark border-dark text-white"
                  id="table_name"
                  type="text"
                  name="table_name"
                  onChange={handleChange}
                  value={formData.table_name}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="people" className="text-white form-label">
                Capacity:
                <input
                  className="form-control bg-dark border-dark text-white"
                  id="capacity"
                  type="number"
                  min="1"
                  max="25"
                  name="capacity"
                  onChange={handleChange}
                  value={formData.capacity}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <button className="btn btn-sm" style={customStyle.bg} type="submit">
                Submit
              </button>
              <button
                className="mx-3 btn btn-sm"
                style={customStyle.bgBad}
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm"
                style={customStyle.bgYell}
                onClick={() => setFormData(initialState)}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <ErrorAlert error={tablesError} />
      </div>
    </>
  );
}
