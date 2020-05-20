import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth.module';
import { CourseModule } from './modules/course.module';

const commonConf = {
  SYNCRONIZE: false,
  ENTITIES: [ __dirname + '/domain/*.entity{.ts,.js}',
              __dirname + '/domain/category/*.entity{.ts,.js}',
              __dirname + '/modules/**/*.entity{.ts,.js}'
             ],
  MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations'
  },
  MIGRATIONS_RUN: true
};

@Module({
  imports: [TypeOrmModule.forRoot({
          type: 'mongodb',
          url: 'mongodb+srv://pragra:pragra@cluster0-diuvb.mongodb.net/lms?retryWrites=true&w=majority',
          entities: commonConf.ENTITIES,
          migrations: commonConf.MIGRATIONS,
          synchronize: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          logging: true,
          cli: commonConf.CLI,
          migrationsRun: commonConf.MIGRATIONS_RUN
        }),
      AuthModule,
      CourseModule,
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
