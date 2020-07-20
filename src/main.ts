require('dotenv').config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger.config';
import { config } from './app.config';
import * as fs from 'fs';

const logger: Logger = new Logger('Main');
const port = process.env.NODE_SERVER_PORT || config.get('server.port');


async function bootstrap() {


  const certFile = fs.readFileSync('/etc/letsencrypt/live/pragra.io/fullchain.pem');
  const keyFile = fs.readFileSync('/etc/letsencrypt/live/pragra.io/privkey.pem');
  const appOptions = {
    cors: true,
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  };

  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (): BadRequestException => new BadRequestException('Validation error'),
    }),
  );


  setupSwagger(app);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
