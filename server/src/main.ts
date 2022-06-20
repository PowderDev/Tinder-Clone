import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
