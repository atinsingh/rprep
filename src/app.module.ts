import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './app/auth/auth.module';
import { TestimonialModule } from "./modules/testimonial/testimonial.module";
import { CourseDetailsModule } from "./modules/coursemodules/course.details.module";
import { ContactModule } from './modules/contact/contact.module';
import { ServeStaticModule } from '@nestjs/serve-static';

const commonConf = {
  SYNCRONIZE: false,
  ENTITIES: [ __dirname + '/model/*.entity{.ts,.js}',
              __dirname + '/model/category/*.entity{.ts,.js}',
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
          url: 'mongodb+srv://pragra:pragra@cluster0-diuvb.mongodb.net/lms',
          entities: commonConf.ENTITIES,
          migrations: commonConf.MIGRATIONS,
          synchronize: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          logging: true,
          cli: commonConf.CLI,
          migrationsRun: commonConf.MIGRATIONS_RUN
        }),
        ServeStaticModule.forRoot(
          {
                  rootPath: join(__dirname,'..', 'static'),
                  exclude: ['/api*'],
                 }
        ),
      AuthModule,
      TestimonialModule,
      CourseDetailsModule,
      ContactModule
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
