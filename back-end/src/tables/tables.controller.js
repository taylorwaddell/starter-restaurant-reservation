const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// resService needs to be filled
// create async boundary

// create validation functions

async function list(req, res) {
    const tables = await service.list();
    res.json({ data: tables });
}

async function read(req, res) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    res.json({ data: table });
}

async function create(req, res) {
    const createdTable = await service.create(res.locals.newTable);
    res.status(201).json({ data: createdTable[0] }); //use first() in service???
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
    if (!occupied) return next({ status: 400, message: `${table_name} not occupied.` });
    const removedTable = await service.destroy(table_id);
    await resService.updateStatus(reservation_id, "finished");
    res.status(200).json({ data: removedTable });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)],
    create: [asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(update)],
    destroy: [asyncErrorBoundary(destroy)],
};