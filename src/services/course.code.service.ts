import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CourseCodes } from '../domain/coursecode.entity';
import *  as fast from 'fast-json-patch';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export  class CourseCodeService {

    constructor( @InjectRepository(CourseCodes) private readonly courseCodeRepo: MongoRepository<CourseCodes>) {
    }

    async saveSingleCode( courseCode: CourseCodes): Promise<CourseCodes | any> {
     return  await this.courseCodeRepo.save(courseCode);
    }

    async saveMultipleCodes( courseCode: CourseCodes[]): Promise< CourseCodes[] | any > {
      return await this.courseCodeRepo.save(courseCode);
    }

    async update (courseCode : CourseCodes) : Promise<CourseCodes | any> {
       let code =  await this.courseCodeRepo.findOne({code: courseCode.code});
       if(code == undefined){
         throw new NotFoundException(`Course code found with code : ${courseCode.code} in database`);
       }
      const delta = fast.compare(code,courseCode);
       if(delta ==undefined){
         throw new BadRequestException("Nothing to be changed")
       }
       code =  await fast.applyPatch(code,delta).newDocument;

       await this.courseCodeRepo.updateOne({id:code.id}, {$set: code},{upsert:true});
       return code;
    }

    async applyPatch(id: string ,patch: any): Promise<CourseCodes> {
      const courseCode = await this.courseCodeRepo.findOne(id);
      if(courseCode == null) {
        throw new NotFoundException(`CourseCode NOT FOUND with id : ${id} in database`)
      }

      const code = _.omit(await fast.applyPatch(courseCode,patch).newDocument,['id','code']);
      const res = await this.courseCodeRepo.updateOne({id:id}, {$set: {...code }},{upsert:true});
      console.log(res);
      return courseCode;

    }

    async findOne(options: {}): Promise<CourseCodes | any>{
        return await this.courseCodeRepo.findOne(options);
    }

    async findById(id: string) {
      return await this.courseCodeRepo.findOne(id)
    }

    async findAll(options: {}) : Promise<CourseCodes [] | any> {
      return await this.courseCodeRepo.find(options);
    }

    async expireCode(id: string) : Promise<CourseCodes | any> {
        const code  = await this.courseCodeRepo.findOne(id);
      Logger.log(code);
        if(code==undefined){
          throw new NotFoundException(`Node code found with code : ${id} in database`);
        }
      await this.courseCodeRepo.updateOne({ id: id }, { $set: { expired: true, expiryDate: new Date() } });
        return await this.courseCodeRepo.findOne({code: id});
    }

    async purgeExpiredCode() : Promise<any> {
      return await this.courseCodeRepo.deleteMany({expired:true})
    }
}
