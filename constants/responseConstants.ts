export class ResponseConstants {
  public static SUCCESS_STATUS: string = "success";
  public static SUCCESS_OK: number = 200;
  public static ERROR_STATUS: string = "error";
  public static INETRNAL_SERVER_ERROR: number = 500;

  // GENERIC ERRORS
  public static GENERIC_ERROR_MESSAGE: string =
    "Something went wrong querying data.";

  // API KEYS
  public static IAM_API_KEY_UNDEFINED: string =
    "IBM Cloud IAM API key is undefined or null.";

  // CLOUDANT ERRORS
  public static CLOUDANT_DATABASE_NAME_UNDEFINED: string =
    "Cloudant database name is not defined or null.";
  public static CLOUDANT_DATABASE_URL_UNDEFINED: string =
    "Cloudant database URL is not defined or null.";

  //CROPS
  public static CROP_NAME_UNDEFINED: string =
    "Crop name is not defined or null.";
  public static CROP_ID_UNDEFINED: string = "Crop id is not defined or null.";
}
