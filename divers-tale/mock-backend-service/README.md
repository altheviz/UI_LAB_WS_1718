# Mock Backend Serivce for Diver's Tale

This will setup a simple and easy to use mock backend service, based on [json-server](https://github.com/typicode/json-server), for the diver's tale app.

## Usage

Install dependencies by going to the folder this file is located in and type:

`npm install`

Then enter the following command to start the server:

`npm start`

This will spawn a web service on `http://localhost:3000`. The data for the service can simply be edited in the `mock-backend-data.json`.

All http-methods are available without further input.

## Example for mock data in `mock-backend-data.json`

```
{
    "users": [
        { "id": 1, "email": "admin@foo.com", "name": "John Doe" }
    ]
}
```

If you then curl the resource `http://localhost:3000/users/` you will get the following output:

```
[
  {
    "id": 1,
    "email": "admin@foo.com",
    "name": "John Doe"
  }
]
```