# Rest API for Raspberry Pi with MySQL-Server and Express

This project is a REST API that connects to a MySQL database to manage persons.
   

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/xMrWho/RestAPI)

## Table of Contents
* [Installation](#installation)
* [API Endpoints](#api-endpoints)
* [Technologies](#technologies)
* [Contributing](#contributing)
* [License](#license)


## Installation
To run this project, you need to have Node.js and MySQL installed on your machine.
Create a new file called "mySql.json"  in the project root directory with your MySQL configuration thatr looks kike this:
```json
{
  "host": "localhost",
  "user": "root",
  "password": "your_password_here",
  "database": "your_database_here"
}
```

Clone this repository
Navigate to the project directory in your terminal
Install the required dependencies with npm install
```bash
cd api
npm i
node index.js
```

## Usage
After you've installed the project, you can use it to manage persons in the MySQL database by making requests to the API endpoints.

The API endpoints can be accessed at 
```sh 
http://localhost:3000
```

## API Endpoints
This REST API has the following endpoints:

|API | Description | Auth | HTTPS | CORS |
|---|---|---|---|---|
|persons|This endpoint handles requests for persons|apiKey|NO|Unknown|

#### Person Endpoint:

##### POST /persons
###### Request Headers:
```sh
x-api-key: Your secret API key
```

###### Request Body:
```json
{
  "action": "get_all_persons"
}
```
or: 
```json
{
  "action": "get_person",
  "id": 123
}
```
or
```json
{
  "action": "other_request"
}
```

###### Response:
```json

// Success - 200
[
  {
    "id": 1,
    "name": "John",
    "age": 30
  },
  {
    "id": 2,
    "name": "Jane",
    "age": 25
  }
]

// Success - 200
{
  "id": 123,
  "name": "John",
  "age": 30
}

// Failure - 400
{
  "message": "Invalid request action"
}

// Failure - 401
{
  "message": "Unauthorized"
}

// Failure - 404
{
  "message": "Person not found"
}

// Failure - 500
{
  "message": "Error retrieving data from database"
}
``` 

## Technologies
This project was created using the following technologies:

- Node.js
- Express
- MySQL

## Contributing
If you would like to contribute to this project, please open an issue or a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.# Rest API for Raspberry Pi with MySQL-Server and Express
This project is a REST API that connects to a MySQL database to manage persons.
