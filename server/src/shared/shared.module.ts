import { Global, Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "src/auth/jwt.strategy"

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: "jwt-secret",
      signOptions: { expiresIn: "30m" },
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class SharedModule {}
