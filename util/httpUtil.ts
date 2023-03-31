import { Observable } from "rxjs";
import * as https from "https";

export const util = {
  httpGet: (url: any) => {
    return new Observable((observer) => {
      https
        .get(url, (resp) => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            data += chunk;
          });
          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            observer.next(JSON.parse(data));
            observer.complete();
          });
        })
        .on("error", (err) => {
          console.log("HTTP GET Error: " + err.message);
          observer.error(err);
        });
    });
  },
};
