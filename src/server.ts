import mongoose from "mongoose";
import app from "./app";
import { green, red } from "console-log-colors";
import { Server } from "http";
const PORT = 5000;
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    // await mongoose.connect(config.database_url as string);
    console.log(green("database connected successfully"));

    server = app.listen(PORT, () => {
      console.log(green(`server running on the port ${PORT}`));
    });
  } catch (error) {
    console.log(red("failed to connect database "), red(error));
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on("SIGTERM", () => {
  console.log("sigterm is received");
  if (server) {
    server.close();
  }
});
