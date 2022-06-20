import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TokenModule } from "./token/token.module";
import { SharedModule } from "./shared/shared.module";
import { ExhibitModule } from "./exhibit/exhibit.module";
import { TagModule } from "./tag/tag.module";
import { ChatModule } from "./chat/chat.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { NotificationModule } from "./notification/notification.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    TokenModule,
    SharedModule,
    ExhibitModule,
    TagModule,
    ChatModule,
    CloudinaryModule,
    NotificationModule,
  ],
})
export class AppModule {}
