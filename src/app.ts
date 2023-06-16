import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route
// app.use('/api/v1/', routes);

//default
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("server running");
});

// global error handler
// app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
});

export default app;
