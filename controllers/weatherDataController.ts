import { Observable } from "rxjs";
import { util } from "../util/httpUtil";
import { APIResponse } from "../util/apiResponse";
import { ResponseConstants } from "../constants/responseConstants";

export class WeatherDataController {
  private FiveDaysURL: string =
    "https://api.weather.com/v3/wx/forecast/daily/5day?format=json";
  private ThreeDaysURL: string =
    "https://api.weather.com/v3/wx/forecast/daily/3day?format=json";
  private weatherAPIKey: any = process.env.TWC_WEATHER_API_KEY;
  private language: string = "en-US";
  private locationPointURL: string =
    "https://api.weather.com/v3/location/point?format=json";

  /**
   * Get 5 days weather forecats for a given geo coordinates
   * @returns 5 days weather forecast
   */
  get5DaysForecast(geoCoordinates: any, units: any) {
    let api = `${this.FiveDaysURL}&apiKey=${this.weatherAPIKey}&geocode=${geoCoordinates}&language=${this.language}&units=${units}`;
    return new Observable((observer: any) => {
      util.httpGet(api).subscribe((response) => {
        if (response) {
          let weatherData = new APIResponse().successResponse(response);
          observer.next(weatherData);
          observer.complete();
        } else {
          let weatherDataError = new APIResponse().errorResponse(
            ResponseConstants.GENERIC_ERROR_MESSAGE
          );
          observer.next(weatherDataError);
          observer.complete();
        }
      });
    });
  }

  /**
   * Get location details for a given geo coordinates
   */
  getLocationDetails(geoCoordinates: any) {
    let api = `${this.locationPointURL}&apiKey=${this.weatherAPIKey}&geocode=${geoCoordinates}&language=${this.language}`;
    return new Observable((observer: any) => {
      util.httpGet(api).subscribe((response) => {
        if (response) {
          let locationData = new APIResponse().successResponse(response);
          observer.next(locationData);
          observer.complete();
        } else {
          let locationDataError = new APIResponse().errorResponse(
            ResponseConstants.GENERIC_ERROR_MESSAGE
          );
          observer.next(locationDataError);
          observer.complete();
        }
      });
    });
  }

  /**
   * Check rain prediction for tomorrow date
   *
   * Commented out for future use
   *
   * @returns Boolean
   */
  /*willItRainTomorrow() {
    let result;
    return new Observable((observer) => {
      let rain = false;
      this.get5DaysForecast().subscribe({
        next: (weatherData: any) => {
          let precip = weatherData["daypart"][0]["precipChance"];
          if (precip[2] >= 50 || precip[3] >= 50) {
            rain = true;
          }
          observer.next({ rain: rain });
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }*/
}
