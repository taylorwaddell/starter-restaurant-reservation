exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE").then(() =>
    knex("tables").insert([
      {
        table_name: "#1",
        capacity: 2,
      },
      {
        table_name: "#2",
        capacity: 2,
      },
      {
        table_name: "#3",
        capacity: 4,
      },
      {
        table_name: "#4",
        capacity: 6,
      },
      {
        table_name: "#5",
        capacity: 8,
      },
    ])
  );
};
