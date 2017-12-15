# Mock Backend Serivce for Diver's Tale

This will setup a simple and easy to use mock backend service, based on [json-server](https://github.com/typicode/json-server), for the diver's tale app.

## Usage

Install dependencies by going to the folder this file is located in and type:

`npm install`

Then enter the following command to start the server:

`npm start`

This will spawn a web service on `http://localhost:3000`. The data for the service can simply be edited in the `mock-backend-data.json`.

All http-methods are available without further input.

**IMPORTANT:** To be able to access the web service on real Android devices via `http://localhost:3000` you need to anable port forwarding. Luckily Google's Chrome make this fairly easy:

1. Go to `chrome://inspect/#devices` in Chrome
2. Click on "Port forwarding..."
3. Add `3000` in field "Port" and `localhost:3000` in field "IP address and port"
4. Make sure to enable "Enable port forwarding" checkbox
5. Click "Done"

Now you can go to your browser on your Android device and reach the web service under `http://localhost:3000` and of course also from within your Diver's Tale app.

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