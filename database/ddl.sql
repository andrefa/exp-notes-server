-- -----------------------------------------------------
-- Function days_till_end
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION days_till_end(start_date date, end_date date) RETURNS integer as $$
DECLARE days_diff integer;
BEGIN
	SELECT DATE_PART('day', $2::timestamp - greatest($1, current_date)::timestamp)::integer into days_diff;
	RETURN greatest(days_diff, 0);
END;$$
LANGUAGE PLPGSQL;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  token VARCHAR(64) NOT NULL
);


-- -----------------------------------------------------
-- Table currencies
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS currencies (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL UNIQUE,
	"symbol" VARCHAR(4) NOT NULL UNIQUE
);


-- -----------------------------------------------------
-- Table sources
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS sources (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL UNIQUE
);


-- -----------------------------------------------------
-- Table places
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS places (
	id SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL UNIQUE
);


-- -----------------------------------------------------
-- Table categories
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE,
  parent_category_id INT4,
  CONSTRAINT categories_parente_cat_id_fk
    FOREIGN KEY (parent_category_id)
    REFERENCES categories (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);


-- -----------------------------------------------------
-- Table trips
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS trips (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);


-- -----------------------------------------------------
-- Table user_trips
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS user_trips (
  user_id INT4 NOT NULL,
  trip_id INT4 NOT NULL,
  CONSTRAINT fk_user_trips_users
    FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_trips_trips
    FOREIGN KEY (trip_id)
    REFERENCES trips (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT uq_trip_id_user_id
    UNIQUE(user_id, trip_id));


-- -----------------------------------------------------
-- Table expenses
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL primary KEY,
  description VARCHAR(200) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  date DATE NOT NULL,
  trip_id INT4 NOT NULL,
  category_id INT4 NOT NULL,
  source_id INT4 NOT NULL,
  place_id INT4 NOT NULL,
  currency_id INT4 NOT NULL,
  CONSTRAINT fk_expenses_trips1
    FOREIGN KEY (trip_id)
    REFERENCES trips (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_expenses_categories1
    FOREIGN KEY (category_id)
    REFERENCES categories (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_expenses_sources1
    FOREIGN KEY (source_id)
    REFERENCES sources (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_expenses_places1
    FOREIGN KEY (place_id)
    REFERENCES places (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_expenses_currencies1
    FOREIGN KEY (currency_id)
    REFERENCES currencies (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table budgets
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  trip_id INT4 NOT NULL,
  source_id INT4 NOT NULL,
  currency_id INT4 NOT NULL,
  amount DECIMAL(7,2) NOT NULL,
  CONSTRAINT fk_budgets_trips
    FOREIGN KEY (trip_id)
    REFERENCES trips (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_budgets_money_sources1
    FOREIGN KEY (source_id)
    REFERENCES sources (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_budgets_currency1
    FOREIGN KEY (currency_id)
    REFERENCES currencies (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT uq_trip_source_currency
    UNIQUE(trip_id, source_id, currency_id));


-- -----------------------------------------------------
-- Table tasks
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  trip_id INT4 NOT NULL,
  description VARCHAR(200) NOT NULL,
  complete BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_tasks_trips
    FOREIGN KEY (trip_id)
    REFERENCES trips (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
