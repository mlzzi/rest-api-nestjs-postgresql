# API Documentation

## Overview

This repository contains an educational API project developed using the NestJS framework. It demonstrates various functionalities such as:

* **User management**
* **Weather data handling**
* **Product fetching**
* **Authentication**

It also integrates third-party APIs for practical examples.

---

## Features

### Users Module

* **Endpoints:**
  * `GET /users`: Fetches all users from an external API.
  * `GET /users/filtered?search=<name>`: Retrieves filtered users whose names start with the provided query.
  * `POST /users`: Creates a new user and stores it via the external API.
* **Technology:** Axios is used to interact with [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).

### Weather Module

* **Endpoints:**
  * `GET /weather/current?location=<city>`: Fetches current weather for a given location from [WeatherStack API](https://weatherstack.com/).
  * `POST /weather/save?location=<city>`: Saves the weather data of the specified location into the database.
  * `GET /weather/all`: Retrieves all saved weather records.
* **Database:** Data is stored using TypeORM and SQLite (or another configured database).

### Products Module

* **Endpoints:**
  * `GET /products`: Fetches a list of products from [FakeStore API](https://fakestoreapi.com/).

### Auth Module

* **Endpoints:**
  * `POST /auth/login`: Authenticates the user and returns a token. (Uses [Reqres API](https://reqres.in/) for testing.)

---

## Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later)
* [NestJS CLI](https://docs.nestjs.com/cli/overview)
* [PostgreSQL](https://www.postgresql.org/) or other database for persistence
