import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { TokenService } from "./token.service"

@Module({
  providers: [TokenService, PrismaService],
})
export class TokenModule {}
