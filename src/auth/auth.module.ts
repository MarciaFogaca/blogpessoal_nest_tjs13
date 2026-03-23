import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config"; 
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        ConfigModule, 
        JwtModule.registerAsync({ 
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        })
    ],
    providers: [
        Bcrypt,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};