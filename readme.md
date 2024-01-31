# Sunbase-Java-App

## Demo

Watch a quick demo of Sunbase-Java-App on [Click here for Demo](https://vimeo.com/908245453).

## Getting Started

Follow these simple steps to run this app locally on your machine.

### Prerequisites

- Java Development Kit (JDK)
- MySQL Server

### Installation

1. **Create Database Table:**

   Execute the following SQL query to create a table named `Customer` in your MySQL database:

   ```sql
   CREATE TABLE Customer (
       id VARCHAR(50) NOT NULL,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50) NOT NULL,
       street VARCHAR(100),
       address VARCHAR(100),
       city VARCHAR(50),
       state VARCHAR(50),
       email VARCHAR(100),
       phone VARCHAR(15),
       PRIMARY KEY (id)
   );```

2. **Configure Database Connection:**

   Open the `application.properties` file in your project and update the following properties with your MySQL server details:

   `spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password`

### Running Locally

3. Run the following commands to build the application:

   ./gradlew build

4. Once the build is successful, run the application using the following command:

   ./gradlew bootRun
