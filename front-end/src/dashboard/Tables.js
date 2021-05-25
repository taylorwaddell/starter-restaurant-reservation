import { clearTable } from "../utils/api";

export default function Reservation({ table }) {
  const handleFinish = async () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? \n \n \nThis cannot be undone."
      )
    ) {
      try {
        await clearTable(table.table_id);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <div
        className="card m-3 border-warning bg-secondary rounded"
        style={{ width: "10rem" }}
      >
        <div className="card-body">
          <h5 className="card-title"> Table {table.table_name}</h5>
          <div className="card-subtitle mb-2 text-dark">
            <p className="m-2 text-dark">capacity: {table.capacity}</p>
          </div>
          {table.reservation_id ? (
            <div className="border rounded border-danger bg-danger">
              <h6 className="m-2" data-table-id-status={table.table_id}>
                occupied
              </h6>
              <button
                className="m-2 mb-3 btn border border-dark"
                data-table-id-finish={table.table_id}
                onClick={handleFinish}
              >
                Finish
              </button>
            </div>
          ) : (
            <div className="border rounded border-success bg-success">
              <h6 className="m-2" data-table-id-status={table.table_id}>
                free
              </h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
