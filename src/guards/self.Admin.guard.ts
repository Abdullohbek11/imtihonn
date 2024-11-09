import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class SelfAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException(
        "bunday foydalanuvchi yoki admin mavjud emas"
      );
    }

    const userId = req.user.sub;
    const adminId = req.params.id;

    if (userId !== adminId) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan foydalanuvchi",
      });
    }

    return true;
  }
}
