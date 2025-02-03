-- Script to create database schema based on queries from Justin's code.
-- Unsure as to complete accuracy, but a good start I'd say.

-- Create the database (optional, adjust as needed)
CREATE DATABASE proto;
USE proto;

-- Table: USR_MAIN (User Accounts)
CREATE TABLE USR_MAIN (
    USR_userid VARCHAR(50) PRIMARY KEY,  -- Assuming usernames are unique - I think these are the Fuel Site names
    oper_oper_no VARCHAR(50) NOT NULL,   -- Operator number (role or ID)
    disabled_reason VARCHAR(255) NOT NULL -- This seems to be storing passwords, should be hashed if so 
);

-- Table: FTK_bulkfuel (Fuel Transactions)
CREATE TABLE FTK_bulkfuel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datetime_Insert DATETIME NOT NULL,  -- Timestamp of record insertion
    ftk_date DATE NOT NULL,  -- Date of the fuel transaction
    loc_code VARCHAR(50) NOT NULL,  -- Location code of the fuel site - foreign key to LOC_MAIN
    fuel_type VARCHAR(50) NOT NULL,  -- Type of fuel
    totalizer_start DECIMAL(10,2),  -- Start reading of fuel totalizer
    eq_no VARCHAR(50),  -- Equipment number
    pid_info VARCHAR(50),  -- Personnel or process ID related to the transaction - ex: admin... but this is like initials etc.
    odometer INT,  -- Odometer reading (if applicable)
    qty_fuel DECIMAL(10,2),  -- Quantity of fuel dispensed
    totalizer_end DECIMAL(10,2),  -- End reading of fuel totalizer
    acct_code VARCHAR(50),  -- Account code for the transaction
    business_purpose TEXT,  -- Description of the business purpose
    totalizer_update DECIMAL(10,2)  -- Possibly a derived totalizer value
);

-- Table: LOC_MAIN (Fuel Site Locations)
CREATE TABLE LOC_MAIN (
    LOC_loc_code VARCHAR(50) PRIMARY KEY,  -- Unique location code
    name VARCHAR(255) NOT NULL,  -- Name of the location
    email_addr VARCHAR(255),  -- Contact email for the location
    is_fuel_site CHAR(1) NOT NULL CHECK (is_fuel_site IN ('Y', 'N')) -- Indicates if it's a fuel site
);

-- Sample Indexes (adjust based on performance needs)
CREATE INDEX idx_FTK_bulkfuel_datetime ON FTK_bulkfuel(datetime_Insert);
CREATE INDEX idx_FTK_bulkfuel_loc ON FTK_bulkfuel(loc_code);
CREATE INDEX idx_FTK_bulkfuel_pid ON FTK_bulkfuel(pid_info);
CREATE INDEX idx_LOC_MAIN_fuel_site ON LOC_MAIN(is_fuel_site);

-- Foreign Keys (assuming relationships)
ALTER TABLE FTK_bulkfuel ADD FOREIGN KEY (loc_code) REFERENCES LOC_MAIN(LOC_loc_code);
ALTER TABLE USR_MAIN ADD CONSTRAINT fk_usr_oper FOREIGN KEY (oper_oper_no) REFERENCES FTK_bulkfuel(pid_info);