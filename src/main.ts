import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './logger/eroorhanling';
import { Logger } from '@nestjs/common';
import { CustomValidationPipe } from './pipe/validation.pipe';
import * as cookieParser from 'cookie-parser';
async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    // Cookie-parser middleware
    app.use(cookieParser());

    // Swagger
    const config = new DocumentBuilder()
      .setTitle('Mebel Project')
      .setDescription('Mebel Project REST API')
      .setVersion('1.0')
      .addTag('NESTJS, Validate, Swagger, Guard, Sequelize, PG')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Exception filters9
    app.useGlobalFilters(new AllExceptionsFilter(new Logger()));
    app.useGlobalPipes(new CustomValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.error(' Server startup error:', error);
  }
}

start();
