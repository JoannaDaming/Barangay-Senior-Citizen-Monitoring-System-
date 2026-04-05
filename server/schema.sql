CREATE DATABASE IF NOT EXISTS barangay_monitoring_db;
USE barangay_monitoring_db;

CREATE TABLE IF NOT EXISTS households (
    household_id INT AUTO_INCREMENT PRIMARY KEY,
    purok_number INT NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    emergency_contact_name VARCHAR(100),
    emergency_contact_num VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS residents (
    resident_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    civil_status ENUM('Single', 'Married', 'Widowed', 'Separated') NOT NULL,
    osca_id VARCHAR(50) UNIQUE,
    is_indigent BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (household_id) REFERENCES households(household_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS benefit_logs (
    benefit_id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT,
    benefit_type VARCHAR(100) NOT NULL,
    date_received TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    distributed_by VARCHAR(100),
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS health_records (
    health_id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT UNIQUE,
    physical_status ENUM('Healthy', 'Disabled', 'Bedridden', 'Needs Assistance') NOT NULL,
    medical_conditions TEXT,
    last_checkup DATE NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE
);
