import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth.module';
import { CourseModule } from './modules/course.module';

const commonConf = {
  SYNCRONIZE: false,
  ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations'
  },
  MIGRATIONS_RUN: true
};

@Module({
  imports: [TypeOrmModule.forRoot({
          type: 'mongodb',
          url: 'mongodb://localhost:27017/lms',
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          migrations: commonConf.MIGRATIONS,
          synchronize: true,
          useNewUrlParser: true,
          logging: true,
          cli: commonConf.CLI,
          migrationsRun: commonConf.MIGRATIONS_RUN
        }),
      AuthModule,
      CourseModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
