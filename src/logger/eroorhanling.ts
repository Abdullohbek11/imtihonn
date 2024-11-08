import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { winstonConfig } from './logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Serverda kutilmagan xatolik yuz berdi';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = this.getDetailedErrorMessage(status, exception.getResponse());
    } else if (exception instanceof Error) {
      message = `${exception.name}: ${exception.message}`;
    } else if (exception instanceof TypeError) {
      message = "Ma'lumot turi noto'g'ri";
    }

    winstonConfig.error(
      `Xatolik: ${message}`,
      exception instanceof Error ? exception.stack : null,
    );

    const errorResponse = {
      statusKodi: status,
      vaqt: new Date().toISOString(),
      manzil: request.url,
      xabar: message,
      xatolikTuri:
        exception instanceof Error ? exception.name : "Noma'lum xatolik",
      qoshimchaMalumot: this.getAdditionalInfo(exception),
    };

    response.status(status).json(errorResponse);
  }

  private getDetailedErrorMessage(status: number, response: any): string {
    const errorMessages = {
      400: "Noto'g'ri so'rov yuborildi",
      401: "Avtorizatsiyadan o'tilmagan",
      403: 'Sizga bu amalni bajarish taqiqlangan',
      404: "So'ralgan ma'lumot topilmadi",
      409: "Ma'lumotlar bazasida bunday yozuv mavjud",
      422: "Yuborilgan ma'lumotlar yaroqsiz",
      429: "So'rovlar soni me'yordan oshib ketdi",
      500: 'Serverda ichki xatolik yuz berdi',
      503: 'Servis vaqtinchalik ishlamayapti',
    };

    if (typeof response === 'object' && 'message' in response) {
      return Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
    }

    return errorMessages[status] || "Noma'lum xatolik yuz berdi";
  }

  private getAdditionalInfo(exception: unknown): any {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'object') {
        return {
          tafsilotlar: response['message'],
          xatolikKodi: response['error'],
        };
      }
    }
    return null;
  }
}
