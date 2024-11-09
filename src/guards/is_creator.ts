import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = this.jwtService.verify(token);
      request.user = user;

      return user.is_creator === true;
    } catch (error) {
      return false;
    }
  }
}
