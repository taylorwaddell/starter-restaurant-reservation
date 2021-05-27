import customStyle from "../customStyle";
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
      <div className="card m-3 bg-secondary rounded" style={{ width: "10rem" }}>
        <div className="card-body">
          <h5 className="card-title" style={customStyle.text}> Table {table.table_name}</h5>
          <div className="card-subtitle mb-2 text-secondary">
            <p className="m-2 text-white">capacity: {table.capacity}</p>
          </div>
          {table.reservation_id ? (
            <div className="pt-1" style={customStyle.bgBad}>
              <h6 className="m-2 text-dark" data-table-id-status={table.table_id}>
                OCCUPIED
              </h6>
              <button
                className="m-2 mb-3 btn border border-dark"
                data-table-id-finish={table.table_id}
                onClick={handleFinish}
              >
                FINISH
              </button>
            </div>
          ) : (
            <div className="p-2" style={customStyle.bg}>
            <h6 className="m-2 text-dark" style={customStyle.text} data-table-id-status={table.table_id}>
              FREE
            </h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
