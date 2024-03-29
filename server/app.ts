require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddlware } from "./middleware/error";
import userRouter from "./routes/user.route";

// import httpStatus from 'http-status';

// import { ErrorHandler } from './utils/errorHandler';
// import defaultVars from './config/defaultVars';
// import { errorMiddlware } from './middleware/errorMiddware';
// import router from './routes';
// import swaggerRouter from './docs';

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors origin sharing
app.use(cors({ origin: process.env.PORT }));

// routes
app.use("/api/v1", userRouter);

// testing api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Happy codig",
  });
});

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

// unkown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddlware);
