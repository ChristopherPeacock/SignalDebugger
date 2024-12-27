# Location Fetcher and Logger

This project consists of two parts: a Python script that fetches geographical coordinates and logs location data, and a Node.js server that provides the coordinates via an HTTP endpoint and handles the incoming data.

## Requirements

### Python:
- `requests`
- `geopy`

### Node.js:
- `express`
- `child_process`
- `stream`

### Installation

#### Python:
1. Install the required packages:
    ```bash
    pip install requests geopy
    ```

#### Node.js:
1. Initialize a Node.js project and install dependencies:
    ```bash
    npm init -y
    npm install express
    ```

2. Create a server by running the `server.js` script.

## How It Works

1. The Python script continuously fetches coordinates from a local HTTP server running on `localhost:3000`.
2. The server executes an ADB command to retrieve the device's latitude and longitude using the `dumpsys location` command.
3. The server responds with the coordinates in JSON format.
4. The Python script uses these coordinates to fetch location information and logs it by sending the data to the same server.

## Running the Project

1. Start the Node.js server:
    ```bash
    node server.js
    ```

2. Run the Python script to fetch coordinates and log location data.

## License

This project is licensed under the MIT License.
