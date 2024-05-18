import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CookieService } from '../cookie/cookie.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException('Почта или пароль указаны неверно');
    }
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });

    const userRole = decodedToken.role;
    if (userRole !== 'admin') {
      return true;
    } else {
      throw new UnauthorizedException('Недостаточно прав');
    }
  }
}
