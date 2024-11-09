import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/model/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/api/auth/activate/${user.activation_link}`;

    try {
      console.log('Sending email with details:', {
        to: user.email,
        url,
        fullName: user.full_name,
      });
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Mebel webga hush kelibsiz!!!', 
        template: 'confirm', 
        context: {
          name: user.full_name,
          url,
        },
      });
    } catch (error) {
      console.error('Detailed Email Error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        response: error.response,
      });
      throw new InternalServerErrorException(
        `Email yuborishda xatolik: ${error.message}`,
      );
    }
  }
}
