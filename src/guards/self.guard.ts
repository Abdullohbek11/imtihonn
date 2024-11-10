// Kerakli modullarni import qilish
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (String(req.user.sub) !== req.params.id) {
      throw new ForbiddenException({
        massage: 'ruxsat etilmagan foydalanuvchi',
      });
    }
    return true;
  }
}
