import express, { Response, Request } from "express";
import { WeatherDataController } from "../controllers/weatherDataController";

export const weatherRouter = express.Router();

/**
 * Get route: /api/v1/liquidPrep/weather/data
 */
weatherRouter
  .get("/weather/data", (req: Request, res: Response) => {
    new WeatherDataController()
      .get5DaysForecast(req.query.geoCode, req.query.units)
      .subscribe((weatherData) => {
        res.send(weatherData);
      });
  })

  /**
   * Get route: /api/v1/liquidPrep/location/data
   */
  .get("/location/data", (req: Request, res: Response) => {
    new WeatherDataController()
      .getLocationDetails(req.query.geoCode)
      .subscribe((locationData) => {
        res.send(locationData);
      });
  });
