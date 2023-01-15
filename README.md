# Connect Lab

This project is a simple REST API that allows you to manage users, devices, and locations. This project is built using NestJS. This project also uses OpenAPI/Swagger to document and test the API endpoints.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL

### Setting up and running the app

1. Clone the repository

```bash
git clone https://github.com/francisko-rezende/connect-lab-backend.git
```

2. Create a PostgreSQL database.
3. Create a `.env` file in the root of the project. Use the `.env.example` file as a guide to setup the environment variables.

4. Install the dependencies

```bash
npm install
```

5. Run the migrations

```bash
$ npm run migration:run
```

6. Run the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Populating the Database

The first time you set up the project, you will need to populate the database with the default devices and locations. To do this, you can use the `/populate` endpoint.

```
POST /populate
```

This will add the default devices and locations to the database.

### Accessing the OpenAPI/Swagger page

You can access the OpenAPI/Swagger page by visiting `http://localhost:3000/api` in your browser with the app running. This page allows you to view the API documentation and test the endpoints.

### Downloading the OpenAPI JSON

You can download the OpenAPI JSON by visiting `http://localhost:3000/api-json` in your browser with the app running. This will download the JSON file which contains the API documentation.

### Endpoints

- `/sign-in`: Allows user to sign in with their credentials
- `/user`: Allows user to create and retrieve their profile
- `/change-password`: Allows the user to change their password
- `/user-device`: Allows the user to link a device to their profile
- `/user-devices`: Allows the user to retrieve all the linked devices
- `/user-devices/{userDeviceId}`: Allows the user to retrieve a specific device linked to his profile

### Built With

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Authors

[Francisko de Moraes Rezende](https://www.linkedin.com/in/francisko-rezende/)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
