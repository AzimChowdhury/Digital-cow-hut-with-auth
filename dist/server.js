"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const console_log_colors_1 = require("console-log-colors");
const config_1 = __importDefault(require("./config"));
const PORT = 5000;
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log((0, console_log_colors_1.green)("database connected successfully"));
            server = app_1.default.listen(PORT, () => {
                console.log((0, console_log_colors_1.green)(`server running on the port ${PORT}`));
            });
        }
        catch (error) {
            console.log((0, console_log_colors_1.red)("failed to connect database "), (0, console_log_colors_1.red)(error));
        }
        process.on("unhandledRejection", (err) => {
            if (server) {
                server.close(() => {
                    console.log(err);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
bootstrap();
process.on("SIGTERM", () => {
    console.log("sigterm is received");
    if (server) {
        server.close();
    }
});
