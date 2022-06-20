import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { Exhibit, Sex } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateExhibitDTO } from "./exhibit.dto"

@Injectable()
export class ExhibitService {
  constructor(private prisma: PrismaService) {}

  async createExhibit(dto: CreateExhibitDTO, userId: number): Promise<Exhibit> {
    const exists = await this.prisma.exhibit.findUnique({ where: { userId } })
    if (exists) {
      throw new BadRequestException("This user already has an exhibit")
    }

    const tags = dto.tagIDs.reduce((acc, tagID) => {
      acc.push({ id: parseInt(tagID) })
      return acc
    }, [])

    delete dto.tagIDs

    const exhibit = await this.prisma.exhibit.create({
      data: { tags: { connect: tags }, ...dto, userId },
    })

    return exhibit
  }

  async getExhibitById(id: number): Promise<Exhibit> {
    const exhibit = await this.prisma.exhibit.findUnique({
      where: { id },
      include: { tags: true, user: true },
    })

    if (!exhibit) {
      throw new NotFoundException("Exhibit with this ID not found")
    }

    return exhibit
  }

  async getMyFeed(sex: Sex, take = 10, skip = 0, userId: number): Promise<Exhibit[]> {
    const exhibitsIDidNotSaw = await this.prisma.exhibit.findMany({
      where: {
        user: { sex: { not: sex }, id: { notIn: [userId] } },
        NOT: { saw: { has: userId } },
      },
      include: { user: true },
    })

    if (exhibitsIDidNotSaw.length === 0) {
      const allExhibits = await this.prisma.exhibit.findMany({
        where: { user: { sex: { not: sex } } },
        include: { user: true },
        take,
        skip,
      })
      return allExhibits
    }

    return exhibitsIDidNotSaw
  }

  async addUserToSaw(id: number, userId: number) {
    await this.prisma.exhibit.update({ where: { id }, data: { saw: { push: userId } } })
  }

  async getMyExhibit(userId: number): Promise<Exhibit> {
    const exhibit = await this.prisma.exhibit.findUnique({
      where: { userId },
      include: { tags: true },
    })

    if (!exhibit) {
      throw new BadRequestException("This user does not have an exhibit")
    }

    return exhibit
  }
}
