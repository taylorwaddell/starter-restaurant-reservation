exports.up = function (knex) {
  return knex.schema.createTable("reservations_info", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.integer("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("party_size").notNullable();
    table.string("status").defaultTo("booked");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.table("reservations_info", (table) => {
    table.dropColumns(
      "reservation_id",
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "party_size",
      "status"
    );
  });
};
