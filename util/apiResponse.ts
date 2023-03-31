import { ResponseConstants } from "../constants/responseConstants";

interface Response {
  status: string;
  statusCode: number;
  data: any;
  message: any;
  headers: Object;
}

export class APIResponse {
  private headers: Object = { "Content-Type": "application/json" };

  public successResponse(data: any): Response {
    let response: Response = {
      status: ResponseConstants.SUCCESS_STATUS,
      statusCode: ResponseConstants.SUCCESS_OK,
      data: data,
      message: null,
      headers: this.headers,
    };

    return response;
  }

  public errorResponse(message: string): Response {
    let response: Response = {
      status: ResponseConstants.ERROR_STATUS,
      statusCode: ResponseConstants.INETRNAL_SERVER_ERROR,
      data: null,
      message: message,
      headers: this.headers,
    };

    return response;
  }
}
