import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { AuthenticatedUser } from './dto/authenticated.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const authUser: any = email;
    const user = await this.usersService.findByEmail(authUser.email);
    if (user) {
      return user;
    } else {
      const payload: AuthDto = { email: authUser.email, password: pass };
      const user = this.bypassSuperAdminWithJWT(payload);
      if (user) {
        return user;
      }
    }
    return null;
  }

  async login(user: AuthDto) {
    const userObj = await this.usersService.findByEmail(user.email);

    if (userObj) {
      const payload = {
        email: userObj.email,
        name: userObj.name,
        id: userObj.id,
      };
      return {
        ...payload,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      // allow if the user is SUPERADMIN
      const payload = this.bypassSuperAdmin(user);
      if (payload) {
        return {
          ...payload,
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  bypassSuperAdmin(user: AuthDto): AuthenticatedUser {
    if (user.email === 'superadmin@admin.com' && user.password === 'password') {
      const payload = {
        email: 'superadmin@admin.com',
        name: 'SuperAdmin',
        id: -100,
      };
      return payload;
    } else return null;
  }
  bypassSuperAdminWithJWT(user: AuthDto): AuthenticatedUser {
    if (user.email === 'superadmin@admin.com') {
      const payload = { email: 'superadmin@admin.com', id: -100 };
      return payload;
    } else return null;
  }
}
