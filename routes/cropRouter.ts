import express, { Response, Request } from "express";
import { cropDataController } from "../controllers/cropDataController";

export const cropRouter = express.Router();

cropRouter
  /**
   * Get route: /api/v1/liquidPrep/crop/list
   */
  .get("/crop/list", (req: Request, res: Response) => {
    new cropDataController().getCropList().subscribe((cropListData) => {
      res.send(cropListData);
    });
  })
  /**
   * Get route: /api/v1/liquidPrep/crop/:id
   */
  .get("/crop/:id", (req: Request, res: Response) => {
    new cropDataController()
      .getCropInfo(req.params.id)
      .subscribe((cropData) => {
        res.send(cropData);
      });
  });
