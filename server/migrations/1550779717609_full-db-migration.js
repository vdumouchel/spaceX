exports.up = pgm => {
	pgm.sql(`
    CREATE TABLE "spaceexplorers"."users" (
      "user_id" SERIAL PRIMARY KEY,
      "user_fullname" VARCHAR (64),
      "user_username" VARCHAR (64) UNIQUE,
      "user_email" TEXT UNIQUE NOT NULL,
      "user_password" TEXT NOT NULL,
      "user_date_joined" DATE DEFAULT CURRENT_TIMESTAMP
    );
    

    CREATE TABLE "spaceexplorers"."bookings" (
      "booking_id" SERIAL PRIMARY KEY,
      "booking_flight_number" NUMERIC (9,0),
      "booking_rocket_id" VARCHAR (64),
      "booking_rocket_type" VARCHAR (64),
      "booking_mission_name" VARCHAR (64),
      "booking_mission_patch" VARCHAR (199),
      "booking_launch_year" VARCHAR (64),
      "booking_launch_date_local" VARCHAR (64),
      "booking_launch_site_name_long" VARCHAR (64),
      "booking_launch_is_booked" BOOLEAN,
      "booking_launch_user_id" NUMERIC (9,0),
      "booking_date" DATE DEFAULT CURRENT_TIMESTAMP
      )
  `);
};
