import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewTable() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: 0,
  });
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: [target.value] });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // insert API submit sauce here
    history.push(`/dashboard`);
  }
  return (
    <form>
      <label htmlFor="table-name">Table Name</label>
      <input
        name="table_name"
        id="table_name"
        type="text"
        onChange={handleChange}
        value={formData.table_name}
        required
      />
      <label htmlFor="capacity">Capacity</label>
      <input
        name="capacity"
        id="capacity"
        type="number"
        onChange={handleChange}
        value={formData.capacity}
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

export default NewTable;
