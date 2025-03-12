# Employee Tracker Database using CMS

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This project is an Employee Tracker application that uses a Content Management System (CMS) to manage employee data. It allows you to view, add, update, and delete departments, roles, and employees in a PostgreSQL database. The application provides a command-line interface (CLI) for interacting with the database.

## Features

- View all departments, roles, and employees
- Add a department, role, or employee
- Update employee roles and managers
- Delete departments, roles, or employees
- View total salary of a department 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Media](#media)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd employee-tracker-database-using-cms
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your database configuration:
    ```properties
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_DATABASE=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    ```

4. Set up the database:
    ```sh
    psql -U your_db_user -f db/schema.sql
    psql -U your_db_user -f db/seed.sql
    ```

## Usage

1. Build the project:
    ```sh
    npm run build
    ```

2. Start the application:
    ```sh
    npm start
    ```

3. Follow the prompts to manage your employee data.

## Media

### Screenshot
![Employee Tracker Screenshot](Assets/employeetracker.png)

### Video Demo
![Checkout the application in use](https://drive.google.com/file/d/1NT2wX6xkN-Jq-wIeR9K-pQviQRZ17PaW/view?usp=sharing)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.