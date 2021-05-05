CREATE DATABASE customerconnect;

CREATE TABLE customers(
    cust_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    cust_name VARCHAR NOT NULL,
    cust_cntcode INTEGER,
    cust_phone INTEGER,
    cust_country VARCHAR NOT NULL,
    cust_email VARCHAR UNIQUE NOT NULL,
    cust_pass VARCHAR NOT NULL
);