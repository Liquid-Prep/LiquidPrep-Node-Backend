import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cropRouter } from "./routes/cropRouter";
import { weatherRouter } from "./routes/weatherRouter";

// Load environment variables from env file
dotenv.config();

// Instantiate Express App
const app: Express = express();

// Request Body Parser
app.use(express.json());
// Enable CORS
app.use(cors());

// Default server route message
app.get("/", (req: Request, res: Response) => {
  res.send("Liquid Prep Node Backend Server is up and running.");
});

let path = "/api/v1/liquidPrep";

// Mount Routers
app.use(path, cropRouter);
app.use(path, weatherRouter);

// Server Config
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `⚡️[server]: Liquid Prep Node Backend Server is running on http://localhost:${port}`
  );
});
