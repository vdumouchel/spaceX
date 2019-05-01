exports.up = pgm => {
	//1. Users Table
	pgm.sql(`
    CREATE TABLE "bazaar"."users" (
      "user_id" SERIAL PRIMARY KEY,
      "user_first_name" VARCHAR (64),
      "user_last_name" VARCHAR (64),
      "user_username" VARCHAR (64) UNIQUE,
      "user_email" TEXT UNIQUE NOT NULL,
      "user_password" TEXT NOT NULL,
      "user_date_joined" DATE DEFAULT CURRENT_TIMESTAMP,
      "user_account_deleted" BOOL,
      "user_rating" NUMERIC (2,1)
    );

    CREATE TABLE "bazaar"."items" (
      "item_id" SERIAL PRIMARY KEY,
      "item_name" VARCHAR (64) NOT NULL,
      "item_type" VARCHAR (64),
      "item_status" VARCHAR (64),
      "item_price" NUMERIC (9,2),
      "item_quantity_avail" NUMERIC (9,0),
      "item_description" VARCHAR (999),
      "item_thumbnail_url" VARCHAR (999),
      "item_condition" VARCHAR (64),
      "item_owner_id" NUMERIC (9,0),
      "item_date_created" DATE DEFAULT CURRENT_TIMESTAMP,
      "item_quantity_sold" NUMERIC (9,0),
      "item_rating" NUMERIC (2,1),
      "item_rating_num" NUMERIC (9,0)
    );

    CREATE TABLE "bazaar"."transactions" (
      "transaction_id" SERIAL PRIMARY KEY,
      "transaction_item_id" NUMERIC (9,0),
      "transaction_item_name" VARCHAR (64),
      "transaction_item_type" VARCHAR (64),
      "transaction_item_status" VARCHAR (64),
      "transaction_item_price" NUMERIC (9,2),
      "transaction_item_thumbnail_url" VARCHAR (999),
      "transaction_item_condition" VARCHAR(64),
      "transaction_item_buyer_id" NUMERIC (9,0),
      "transaction_item_seller_id" NUMERIC (9,0),
      "transaction_date" DATE DEFAULT CURRENT_TIMESTAMP,
      "transaction_stripe_id" VARCHAR (255)
      );

      CREATE TABLE "bazaar"."user_ratings" (
        "user_rating_id" SERIAL PRIMARY KEY,
        "user_rating_rater_id" NUMERIC (9,0),
        "user_rating_rated_id" NUMERIC (9,0),
        "user_rating_rating" NUMERIC(2,1),
        "user_rating_comment" VARCHAR (499),
        "user_rating_date" DATE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE "bazaar"."item_ratings" (
        "item_rating_id" SERIAL PRIMARY KEY,
        "item_rating_itemrated_id" NUMERIC (9,0),
        "item_rating_rater_id" NUMERIC (9,0),
        "item_rating_rating" NUMERIC (2,1),
        "item_rating_comment" VARCHAR (499),
        "item_rating_date" DATE DEFAULT CURRENT_TIMESTAMP
      );

  `);
};
