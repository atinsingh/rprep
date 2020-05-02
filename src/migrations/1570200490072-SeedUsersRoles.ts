import { getMongoManager, MigrationInterface } from 'typeorm';
import { User } from '../domain/user.entity';
import { Authority } from '../domain/authority.entity';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';
import { CourseInfo } from '../domain/courseinfo.entity';
import { StatusEnum } from '../domain/enums/status.enum';

export class SeedUsersRoles1570200490072 implements MigrationInterface {

  role1: Authority = { name: 'ROLE_ADMIN' };
  // //role1.name='ROLE_ADMIN';
  //
  role2: Authority = { name: 'ROLE_USER' };

  user1: User = {
    login: 'system',
    password: 'system',
    firstName: 'System',
    lastName: 'System',
    email: 'system@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    authorities: [this.role1],
    lastModifiedBy: 'system'
  };

  user2: User = {
    login: 'anonymoususer',
    password: 'anonymoususer',
    firstName: 'Anonymous',
    lastName: 'User',
    email: 'anonymoususer@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    authorities: [this.role1],
    lastModifiedBy: 'system'
  };

  user3: User = {
    login: 'admin',
    password: 'admin',
    firstName: 'Administrator',
    lastName: 'Administrator',
    email: 'admin@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    authorities: [this.role1,this.role2],
    lastModifiedBy: 'system'
  };

  user4: User = {
    login: 'user',
    password: 'user',
    firstName: 'User',
    lastName: 'User',
    email: 'user@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    authorities: [this.role1],
    lastModifiedBy: 'system'
  };

  courseInfo: CourseInfo = {
    courseCode : "JAVASEL",
    courseName : "QA Automation",
    shortDescription : "java learning program",
    description: "best way to learn java from us",
    metadata: {
      createdBy: "Atin",
      lastModifiedBy: "Atin",
      lastModifiedDate: new Date(),
      createdDate: new Date(),
      version: "1"
    },
    author: "atins",
    thumbnailUrl: "",
    instructor: "atins",
    deliveryMode : [
      "ONLINE",
      "OFFLINE"
    ],
    companyId: "pragra",
    deliveryLocation: [
      {
        "locationId": "233"
      }
    ],
    status: StatusEnum.ACTIVE,
    approved: true,
    approvedBy: "VG"

  };


  public async up(queryRunner: MongoQueryRunner): Promise<any> {
   const manager = getMongoManager();
   // const conn = queryRunner.connection;
    // this.role1.name ='ROLE_ADMIN';
    // this.role2.name = 'ROLE_USER';
    // await conn
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Authority)
    //   .values([this.role1, this.role2])
    //   .execute();

    await queryRunner.insertOne("courseinfo",this.courseInfo);
    await queryRunner.insertOne("user", this.user3);
    await queryRunner.insertOne("user", this.user2);



    // await conn
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([this.user1, this.user2, this.user3, this.user4])
    //   .execute();

    // await conn
    //   .createQueryBuilder()
    //   .relation(User, 'authorities')
    //   .of([this.user1, this.user3])
    //   .add([this.role1, this.role2]);

    // await conn
    //   .createQueryBuilder()
    //   .relation(User, 'authorities')
    //   .of(this.user4)
    //   .add([this.role2]);
  }

  // eslint-disable-next-line
  public async down(queryRunner: MongoQueryRunner): Promise<any> {}
}
