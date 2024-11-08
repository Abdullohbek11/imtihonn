import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { Admin } from 'src/admin/model/admin.model';
import { Response } from 'express';
import { User } from 'src/users/model/user.model';
import { v4 as uuidv4 } from 'uuid';
// import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    // private readonly mailService: MailService,
  ) {}

  //==========================USER AUTH==========================\\

  async generateTokensWithUser(user: User) {
    const payload = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Token yaratishda xatolik yuz berdi',
      );
    }
  }

  async updateRefreshTokenUser(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);

      await this.userService.update(id, { hashed_refresh_token });
    } catch (error) {
      throw new Error('Refresh tokenni yangilashda xatolik yuz berdi');
    }
  }

  async signUpUser(createUserDto: CreateUserDto, res: Response) {
    const candidate = await this.userService.findByEmail(createUserDto.email);

    if (candidate) {
      throw new BadRequestException('Bunday Foydalnuvchi mavjud');
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashed_password,
      is_active: false,
      activation_link: uuidv4(),
    });

    const tokens = await this.generateTokensWithUser(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    const updatedUser = await this.userService.update(newUser.id, {
      hashed_refresh_token,
      activation_link: newUser.activation_link,
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'Foydalanuvchi yangilashda xatolik',
      );
    }

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    const response = {
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!",
      user: updatedUser,
      access_token: tokens.access_token,
    };

    return response;
  }

  async signInUser(signinDto: SignInDto, res: Response) {
    try {
      const user = await this.userService.findByEmail(signinDto.email);

      if (!user) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      const isPasswordValid = await bcrypt.compare(
        signinDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      await this.userService.update(user.id, { is_active: true });

      const tokens = await this.generateTokensWithUser(user);
      await this.updateRefreshTokenUser(user.id, tokens.refresh_token);
      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Tizimga muvaffaqiyatli kirildi',
        user: {
          full_name: user.full_name,
          email: user.email,
          is_active: user.is_active,
        },
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'User tizimga kirishda xatolik yuz berdi',
      );
    }
  }

  async signOutUser(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!payload || !payload.id) {
        throw new BadRequestException("Foydalanuvchi verifikatsiyadan o'tmadi");
      }

      const user = await this.userService.findOne(payload.id);

      if (!user) {
        throw new BadRequestException('Foydalanuvchi topilmadi');
      }
      await this.userService.update(user.id, {
        hashed_refresh_token: null,
      });

      res.clearCookie('refresh_token');

      return {
        message: 'Foydalanuvchi tizimdan muvaffaqiyatli chiqdi',
      };
    } catch (error) {
      console.error('SignOut Error:', error);
      throw new UnauthorizedException(
        error.message || 'Foydalanuvchi tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }

  //==========================ADMIN AUTH==========================\\

  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      full_name: admin.full_name,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException('Token yaratishda xato');
    }
  }

  async updateRefreshTokenAdmin(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);

      const admin = await this.adminService.update(id, {
        hashed_refresh_token,
      });
      return admin;
    } catch (error) {
      throw new Error('Refresh tokeni yangilashda xato');
    }
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
      secure: true,
      sameSite: 'strict',
    });
  }

  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const existingAdminByPhone = await this.adminService.findByPhone(
        createAdminDto.phone_number,
      );
      const existingAdminByEmail = await this.adminService.findByEmail(
        createAdminDto.email,
      );

      if (existingAdminByPhone) {
        throw new BadRequestException(
          "Ushbu telefon raqam allaqachon ro'yxatdan o'tgan",
        );
      }

      if (existingAdminByEmail) {
        throw new BadRequestException(
          "Ushbu email allaqachon ro'yxatdan o'tgan",
        );
      }

      if (createAdminDto.password !== createAdminDto.confirm_password) {
        throw new BadRequestException('Parollar bir-biriga mos emas');
      }

      const newAdmin = await this.adminService.create(createAdminDto);

      const tokens = await this.generateTokensWithAdmin(newAdmin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      await this.adminService.update(newAdmin.id, { hashed_refresh_token });

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: "Admin muvaffaqiyatli ro'yxatdan o'tdi",
        admin: newAdmin,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.error('Admin signup xatosi:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error.message || "Admin ro'yxatdan o'tishda xatolik",
      );
    }
  }

  async signInAdmin(signinDto: SignInDto, res: Response) {
    try {
      const admin = await this.adminService.findByEmail(signinDto.email);

      if (!admin) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      const isPasswordValid = await bcrypt.compare(
        signinDto.password,
        admin.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      await this.adminService.update(admin.id, { is_active: true });

      const tokens = await this.generateTokensWithAdmin(admin);
      await this.updateRefreshTokenAdmin(admin.id, tokens.refresh_token);
      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Tizimga muvaffaqiyatli kirildi',
        admin: {
          full_name: admin.full_name,
          email: admin.email,
          is_active: admin.is_active,
        },
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Admin tizimga kirishda xatolik yuz berdi',
      );
    }
  }

  async signOut(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) {
        throw new BadRequestException('Admin topilmadi');
      }

      await this.adminService.update(admin.id, {
        is_active: false,
        hashed_refresh_token: null,
      });

      const updatedAdmin = await this.adminService.findOne(admin.id);

      res.clearCookie('refresh_token');

      return {
        message: 'Admin tizimdan muvaffaqiyatli chiqildi',
        is_active: updatedAdmin.is_active,
      };
    } catch (error) {
      console.error('Xatolik:', error);
      throw new UnauthorizedException(
        error.message || 'Admin tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }
}
