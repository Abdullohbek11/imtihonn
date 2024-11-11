import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //==========================ADMIN AUTH==========================\\

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Admin qoshish',
    type: 'string',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signupadmin')
  async signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Adminni signIn qilish' })
  @ApiResponse({
    status: 200,
    description: 'Tizimga muvaffaqiyatli kirildi',
    type: 'string',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signinadmin')
  async signIn(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signinDto, res);
  }

  @ApiOperation({ summary: 'Adminni signOut qilish' })
  @ApiResponse({
    status: 200,
    description: 'Admin tizimdan muvaffaqiyatli chiqarildi',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signoutadmin')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.signOutAdmin(refreshToken, res);
  }

  

  //==========================USER AUTH==========================\\

  @ApiOperation({ summary: 'Foydalanuvchini signup qilish' })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi qo'shish",
    type: 'string',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signupuser')
  async signUpUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpUser(createUserDto, res);
  }

  @ApiOperation({ summary: 'Foydalanuvchini signIn qilish' })
  @ApiResponse({
    status: 200,
    description: 'Tizimga kirish muvaffaqiyatli',
    type: 'string',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signinuser')
  async signInUser(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(signinDto, res);
  }

  @ApiOperation({ summary: 'Foydalanuvchini signOut qilish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi tizimdan muvaffaqiyatli chiqarildi',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signoutuser')
  async signOutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.signOutUser(refreshToken, res);
  }
}
