# Liquid Prep Node Backend - Typescript + Express

Liquid Prep Node Backend service is a [Typescript](https://www.typescriptlang.org/) and [Express framework](https://expressjs.com/) based service to cater the requests from the [Liquid Prep App](https://github.com/Liquid-Prep/LiquidPrep-App). The service exposes API endpoints for Liquid Prep application to query weather and crop information.

## Contents

- [Build and run the backend](#build-and-run-the-backend)
- [The backend APIs](#the-backend-apis)
- [Contributing](#contributing)
- [License](#license)

## Build and run the backend

### Pre-requisites

1. **Node and NPM**

   - [Install Node](https://nodejs.org/en/download/) to build and run the server

2. **IBM Cloudant Database**

   - The [IBM Cloudant Database](https://www.ibm.com/cloud/cloudant) acts a storage for all the crop data. Please refer the [setup instructions](IBM-Cloudant-DB-Setup.md) to host a database on your IBM Cloud account

3. **The Weather Company API Key**

   - Contact [The Weather Company](https://www.ibm.com/products/weather-company-data-packages/details) to register and subscribe the `5 day weather forecast API` and obtain an API key

4. **Environment variables**

   - Create a `.env` file in the project root folder with the following entries:

     ```
     CLOUDANT_URL=
     CLOUDANT_APIKEY=
     CLOUDANT_DB_NAME=
     TWC_WEATHER_API_KEY=
     ```

     - The `CLOUDANT_URL`, `CLOUDANT_APIKEY` and `CLOUDANT_DB_NAME` values are all obtained when you [setup the IBM Cloudant Database](IBM-Cloudant-DB-Setup.md)
     - The `TWC_WEATHER_API_KEY` is obtained from the Weather Company. Please refer to the third pre-requisite on how to obatin the API key

### Build and run the backend on your local machine

1. **Build the service**
   - Start a terminal/CMD in `~/LiquidPrep-Node-Backend/` folder
   - Execute the command `npm install` to install the node modules
2. **Run the backend**
   - Execute the command `npm start` to run the backend service
   - Open web browser and enter `http://localhost:5000` in the URL section
   - You should see the message `Liquid Prep Node Backend Server is up and running.`

### Build and run the backend as docker container

#### Pre-requisites

1. [Install Docker](https://docs.docker.com/get-docker/) on your local machine.

#### Run the Backend as docker container

1. **Build docker image**

   - Start a terminal/CMD in `~/LiquidPrep-Node-Backend/` folder.
   - Execute the command `docker build --tag liquidprep/backend:dev .`

2. **Run the backend docker container**

   - Execute the command `docker run -it -d -p 5000:5000 --name liquidprep-backend liquidprep/backend:dev`
   - Open the web browser and enter `http://localhost:5000` in the URL section
   - You should see the message `Liquid Prep Node Backend Server is up and running.`

## The backend APIs

Once the backend service is running, you can test the APIs if they are working as expected. You can test the APIs by simply calling them in any browser (Chrome, Firefox, Edge) or using CURL command or API clients like [Postman](https://www.postman.com/).

The backend currently supports four APIs:

1. **GET 5 Days Weather Data:** <br>
   Get weather information for a given geo-coordinates.

   ```text
   http://localhost:5000/api/v1/liquidPrep/weather/data?geoCode=<lat,long>&units=<metric/imperical>
   ```

   **Query Params:** <br>

   - **geoCode**: Geo-coordinates (latitude, longitude) of a location
   - **units**: `e` (metric) or `m` (imperial)

   **Example:** <br>
   Get weather information for geo-coordinates latitude 42.359, longitude 71.068 and units in metrics (e)

   ```text
   http://localhost:5000/api/v1/liquidPrep/weather/data?geoCode=42.359,-71.068&units=e
   ```

2. **GET location data:** <br>
   Get location information for a given geo-coordinates.

   ```text
   http://localhost:5000/api/v1/liquidPrep/location/data?geoCode=<lat,long>
   ```

   **Query Params:** <br>

   - **geoCode**: Geo-coordinates (latitude, longitude) of a location

   **Example:** <br>
   Get location information for geo-coordinates latitude 42.359, longitude 71.068

   ```text
   http://localhost:5000/api/v1/liquidPrep/location/data?geoCode?geoCode=42.359,-71.068
   ```

3. **GET Crop List:**<br>
   Get list of all the crop names and their IDs supported by Liquid Prep. <br>

   ```text
   http://localhost:5000/api/v1/liquidPrep/crop/list
   ```

4. **GET Crop Data:**<br>
   Get a crop information supported by Liquid Prep.

   ```text
   http://localhost:5000/api/v1/liquidPrep/crop/id=<_id>
   ```

   **Path Params:** <br>

   - **id**: It is the unique identity number assigned for the crop and can be obtained from list of supported crops by executing the **GET Crop List** API <br>

   **Example:** <br>
   Get crop information for Corn.

   ```text
   http://localhost:5000/api/v1/liquidPrep/crop/id=1
   ```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Liquid-Prep/Liquid-Prep/blob/main/CONTRIBUTING.md) for details on our code of conduct, areas where we'd like to see community contributions, and the process for submitting pull requests to the project.

## License

Unless otherwise noted, this project is licensed under the Apache 2 License - see the [LICENSE](https://github.com/Liquid-Prep/Liquid-Prep/blob/main/LICENSE) file for details.
