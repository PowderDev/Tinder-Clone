import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { TokenService } from "src/token/token.service"
import { CreateUserDTO } from "src/user/user.dto"
import { UserService } from "src/user/user.service"
import { LoginUserDTO } from "./auth.dto"
import * as bcrypt from "bcrypt"
import { Sex } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService, private userService: UserService) {}

  async register(dto: CreateUserDTO) {
    const user = await this.userService.createUser(dto)
    const tokens = await this.tokenService.createTokens(user.id, user.sex)
    return tokens
  }

  async login(dto: LoginUserDTO) {
    const user = await this.userService.getUserByEmail(dto.email)
    const passwordComparison = await bcrypt.compare(dto.password, user.password)

    if (!passwordComparison) {
      throw new BadRequestException("Invalid password")
    }

    const tokens = await this.tokenService.createTokens(user.id, user.sex)
    return tokens
  }

  async logout(id: number) {
    await this.tokenService.deleteToken(id)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException()
    }

    const userData: { id: string; sex: Sex } = this.tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await this.tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException()
    }

    return await this.tokenService.createTokens(parseInt(userData.id), userData.sex)
  }
}
