-- Database initialization for Scholar Nexus
DROP TABLE IF EXISTS academic_records;

CREATE TABLE academic_records (
    sid SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL UNIQUE,
    academic_discipline VARCHAR(100) NOT NULL
);
