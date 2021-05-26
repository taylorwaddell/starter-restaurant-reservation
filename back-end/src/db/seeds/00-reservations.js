exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() =>
      knex("reservations").insert([
        {
          first_name: "William",
          last_name: "Armor",
          mobile_number: "318-555-5005",
          reservation_date: "2021-05-27",
          reservation_time: "16:00",
          people: 4,
          created_at: "2021-05-21T10:34:53.127Z",
          updated_at: "2021-05-21T10:34:53.127Z",
        },
        {
          first_name: "Peirce",
          last_name: "Nulaxy",
          mobile_number: "225-555-3737",
          reservation_date: "2021-05-27",
          reservation_time: "19:30",
          people: 2,
          created_at: "2021-05-21T10:34:53.127Z",
          updated_at: "2021-05-21T10:34:53.127Z",
        },
        {
          first_name: "Mac",
          last_name: "Bair",
          mobile_number: "985-555-5555",
          reservation_date: "2021-05-30",
          reservation_time: "11:00",
          people: 6,
          created_at: "2021-05-21T10:34:53.127Z",
          updated_at: "2021-05-21T10:34:53.127Z",
        },
        {
          first_name: "Logan",
          last_name: "Baker",
          mobile_number: "504-555-9797",
          reservation_date: "2021-05-30",
          reservation_time: "14:00",
          people: 3,
          created_at: "2021-05-21T10:34:53.127Z",
          updated_at: "2021-05-21T10:34:53.127Z",
        },
        {
          first_name: "Leo",
          last_name: "Vellez",
          mobile_number: "225-555-2624",
          reservation_date: "2021-05-27",
          reservation_time: "18:00",
          people: 3,
          created_at: "2021-05-21T10:34:53.127Z",
          updated_at: "2021-05-21T10:34:53.127Z",
        },
      ])
    );
};
