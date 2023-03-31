import { CloudantV1 } from "@ibm-cloud/cloudant";
import { Observable } from "rxjs";
import { ResponseConstants } from "../constants/responseConstants";
import { APIResponse } from "../util/apiResponse";

export class cropDataController {
  private cloudantDBClient: CloudantV1;
  private cloudantIAMApiKey: any = process.env.CLOUDANT_APIKEY;
  private cloudantURL: any = process.env.CLOUDANT_URL;
  private dbName: any = process.env.CLOUDANT_DB_NAME;

  constructor() {
    this.cloudantDBClient = CloudantV1.newInstance({
      url: this.cloudantURL,
      plugins: [{ iamauth: { cloudantIAMApiKey: this.cloudantIAMApiKey } }],
    });

    this.cloudantDBClient.getServerInformation().then((serverInformation) => {
      const { version } = serverInformation.result;
      console.log(`Cloudant DB Server version ${version}`);
    });
  }

  /**
   * Get list of all the crop names with ID in the database
   */
  public getCropList() {
    return new Observable((observer) => {
      this.cloudantDBClient
        .postFind({
          db: this.dbName,
          selector: {
            type: "crop",
          },
          fields: ["_id", "cropName"],
        })
        .then((response) => {
          if (response.status == ResponseConstants.SUCCESS_OK) {
            let cropList = new APIResponse().successResponse(response.result);
            observer.next(cropList);
            observer.complete();
          } else {
            let cropListError = new APIResponse().errorResponse(
              ResponseConstants.GENERIC_ERROR_MESSAGE
            );
            observer.next(cropListError);
            observer.complete();
          }
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  /**
   * Get a crop data based on its id
   * @param cropId
   */
  public getCropInfo(cropId: any) {
    return new Observable((observer) => {
      if (cropId) {
        this.cloudantDBClient
          .postFind({
            db: this.dbName,
            selector: { _id: cropId },
          })
          .then((response) => {
            if (response.status == ResponseConstants.SUCCESS_OK) {
              let cropInfo = new APIResponse().successResponse(response.result);
              observer.next(cropInfo);
              observer.complete();
            } else {
              let cropInfoError = new APIResponse().errorResponse(
                ResponseConstants.GENERIC_ERROR_MESSAGE
              );
              observer.next(cropInfoError);
              observer.complete();
            }
          })
          .catch((err) => {
            observer.error(err);
          });
      } else {
        throw Error(ResponseConstants.CROP_ID_UNDEFINED);
      }
    });
  }
}
