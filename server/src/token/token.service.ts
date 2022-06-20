import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Sex, Token } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async createTokens(userId: number, sex: Sex) {
    try {
      const accessToken = this.jwt.sign({ id: userId, sex })
      const refreshToken = this.jwt.sign({ id: userId, sex }, { expiresIn: "30d" })

      await this.saveToken(userId, refreshToken)

      return { accessToken, refreshToken }
    } catch (err) {
      console.log(err)
    }
  }

  async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const tokenData = await this.prisma.token.findFirst({ where: { userId } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await this.prisma.token.update({
        where: { id: tokenData.id },
        data: tokenData,
      })
    }

    const token = await this.prisma.token.create({ data: { userId, refreshToken } })
    return token
  }

  async deleteToken(userId: number) {
    await this.prisma.token.delete({ where: { userId } })
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwt.verify(token)
      return userData
    } catch (err) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwt.verify(token)
      return userData
    } catch (err) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.prisma.token.findFirst({ where: { refreshToken } })
    return tokenData
  }
}
