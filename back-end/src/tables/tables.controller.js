const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function checkId(req, res, next) {
  const { table_id } = req.params;
  const data = await service.read(table_id);

  if (!data)
    return next({ status: 404, message: `Table ID: ${table_id} Not Found` });
  else {
    res.locals.table = data;
    next();
  }
}

async function checkNewTable(req, res, next) {
  if (!req.body.data) return next({ status: 400, message: "Data Missing!" });

  const { table_name, capacity, reservation_id } = req.body.data;

  if (!table_name || table_name === "" || table_name.length === 1)
    return next({ status: 400, message: "Invalid table_name" });

  if (!capacity || capacity === 0 || typeof capacity !== "number")
    return next({ status: 400, message: "Invalid capacity" });

  res.locals.newTable = { table_name, capacity };

  if (reservation_id) {
    res.locals.newTable.reservation_id = reservation_id;
    res.locals.newTable.occupied = true;
  }

  next();
}

async function checkUpdate(req, res, next) {
  if (!req.body.data) return next({ status: 400, message: "Data Missing!" });

  const { reservation_id } = req.body.data;
  if (!reservation_id)
    return next({ status: 400, message: "Missing reservation_id" });

  const reservation = await resService.read(reservation_id);
  if (!reservation)
    return next({ status: 404, message: `${reservation_id} does not exist` });

  if (reservation.status === "seated")
    return next({ status: 400, message: "Party already seated" });

  res.locals.reservation = reservation;
  next();
}

async function checkCapacity(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  const reservation = res.locals.reservation;

  if (table.capacity < reservation.people)
    return next({
      status: 400,
      message: `${table.table_name} does not have the capacity to seat ${reservation.people} people.`,
    });

  if (table.occupied)
    return next({
      status: 400,
      message: `${table.table_name} is currently occupied.`,
    });

  next();
}

async function list(req, res) {
  const tables = await service.list();
  res.json({ data: tables });
}

async function read(req, res) {
  const table = await service.read(res.locals.table);
  res.json({ data: table });
}

async function create(req, res) {
  const createdTable = await service.create(res.locals.newTable);
  res.status(201).json({ data: createdTable[0] }); 
}

async function update(req, res) {
  const { table_id } = req.params;
  const reservation_id = res.locals.reservation.reservation_id;
  const updatedTable = await service.update(table_id, reservation_id);
  await resService.updateStatus(reservation_id, "seated");
  res.status(200).json({ data: updatedTable });
}

async function destroy(req, res, next) {
  const { table_id } = req.params;
  const { occupied, table_name, reservation_id } = await service.read(table_id);
  if (!occupied)
    return next({ status: 400, message: `${table_name} not occupied.` });
  const removedTable = await service.destroy(table_id);
  await resService.updateStatus(reservation_id, "finished");
  res.status(200).json({ data: removedTable });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(checkId), asyncErrorBoundary(read)],
  create: [asyncErrorBoundary(checkNewTable), asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(checkUpdate),
    asyncErrorBoundary(checkCapacity),
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(checkId), asyncErrorBoundary(destroy)],
};
