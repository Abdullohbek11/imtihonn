import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AdminModule } from 'src/admin/admin.module';
// import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    AdminModule,
    // MailModule,
    
    JwtModule.register({
      global: true,
      secret: 'mysecretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
