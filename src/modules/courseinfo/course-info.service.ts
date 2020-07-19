import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CourseInfoRepository } from '../../repository/courseinfo.repository';
import { CourseInfo } from '../../model/courseinfo.entity';
import _ from 'lodash';
import { StatusEnum } from '../../model/enums/status.enum';
import { User } from '../../model/user.entity';
import { CourseCodeService } from './course-code.service';
import { CourseCodes } from '../../model/coursecode.entity';
import { BadDataException } from '../../exceptions/bad.data.exception';
import { CourseReview } from '../../model/course.review';
import { ObjectID } from 'mongodb';
import { RelatedRequestDto } from '../../model/dto/related.request.dto';
import { ImageData } from '../../model/images/image.data';
import { ImageTypeEnum } from '../../model/images/image.type.enum';
import { ImageRepository } from '../../repository/image.repository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');



@Injectable()
export class CourseInfoService {

    constructor(private repo: CourseInfoRepository,
                private courseCodeService: CourseCodeService,
                private imageRepo: ImageRepository) {
    }

    /*
        Get All courses for the options passed
     */
    async getAllCourseInfo(options:{}={}): Promise<CourseInfo[]> {
        if(_.isEmpty(options)) {
            // change back to ACTIVE later on
            options = { status: StatusEnum.APPROVED }
        }
        Logger.log(`Finding course info with following option ${options}`)
        const data = await this.repo.find(options);
        Logger.log(`Got following output from database : ${data}`)
        return data;
    }

    /**
     * Get a particular course info using the course id
     * @param id
     * @return {@CourseInfo}
     */
    async getCourseById(id): Promise<CourseInfo>{
            const  info = await this.repo.findOne(id);
            Logger.log(`Got following data from database : ${info}`);
            return info;
    }

    async saveCourse(courseInfo: CourseInfo, user: User ) : Promise<CourseInfo> {

        if (courseInfo == null) {
            throw new BadRequestException(('Empty Body Kindly check body'))
            return
        }

        if(user!=undefined){
            courseInfo.metadata.createdBy = user.firstName;
            courseInfo.metadata.lastModifiedBy = user.firstName;
            courseInfo.metadata.createdDate = new Date();
            courseInfo.metadata.lastModifiedDate = new Date();
            courseInfo.metadata.version = 0;
        }
        if(courseInfo.externalRating == undefined){
            courseInfo.externalRating = 0;
        }
        if(courseInfo.internalRating == undefined) {
            courseInfo.internalRating = 0;
        }
        if(courseInfo.status == undefined){
            courseInfo.status = StatusEnum.NEW
        }
        // check if coursecode is valid one
        Logger.log(`Validating the code  ${courseInfo.courseCode} from DataBase`);
        const code : CourseCodes  = await this.courseCodeService.findAll({code: courseInfo.courseCode});
        if(code == undefined) {
            Logger.error(`Code  ${courseInfo.courseCode} doesn't exist in database`);
            throw  new BadDataException(400,`Invalid Course Code ${courseInfo.courseCode} `, 400);
        }
        if(code.expired) {
            Logger.error(`Code  ${courseInfo.courseCode} is already expired it, kindly use a valid code`);
            throw  new BadDataException(400,`CourseCode ${courseInfo.courseCode} has already expired `, 400);
        }
        if(courseInfo.shortDescription.length<30){
            Logger.error(`CourseInfo is too short, kindly provide the valid`);
            throw  new BadDataException(400,`CourseInfo.shortDescription is too short, kindly provide the valid`, 400);
        }
        courseInfo.approved = false;
        courseInfo.internalRating = courseInfo.internalRating == undefined ? 0 : courseInfo.internalRating;
        courseInfo.externalRating = courseInfo.externalRating == undefined ? 0 : courseInfo.externalRating;
        courseInfo.canonicalName  = _.kebabCase(courseInfo.courseName);
        courseInfo.uuid = uuidv4();


        // Add more business logic here.
       return  this.repo.save(courseInfo);

    }

    async addReviewToCourse(courseReview: CourseReview, courseId: string): Promise<CourseInfo | any> {
        if (courseId == null) {
            throw new BadDataException(400, 'Course ID can\'t be null', 400);
        }
        if (courseReview == null) {
            throw new BadDataException(400, 'Reviews Can\'t be null', 400);
        }
        if (courseReview.reviewStar < 1) {
            throw new BadDataException(400, 'Star value can not be less than 1', 400);
        }
        const course:CourseInfo = await this.repo.findOne(courseId);
        const rev = course.reviews;
        courseReview.reviewDate = (courseReview.reviewDate == undefined || false)? new Date(): courseReview.reviewDate;
        courseReview.status = (courseReview.status == undefined || false)?StatusEnum.NEW:courseReview.status;
        rev.push(courseReview);
        const result = await this.repo.updateOne({ courseCode : course.courseCode }, { $set: { reviews: rev } });
        Logger.log(result)
        return await this.repo.findOne(courseId);
    }

    approveCourseInfo(courseId: string, user: User) : boolean| void {
            //
    }


    async saveImage(id ,image): Promise<CourseInfo| any> {
        const result = await this.repo.updateOne(
          {_id: new ObjectID(id)},
          {$set: {
                  thumbnailUrl: image
              }}
        );
        Logger.log(result)
        return await this.repo.findOne(id);
    }


    async getReviewForACourse(courseId: string) : Promise<CourseReview[] | any> {
        return this.repo.find({
            where: {
                id: courseId
            },
            select: [
                "reviews"
            ]
        })
    }


    async getCourseInfoByUuid(uuid: string) : Promise<CourseInfo | any> {
        return await this.repo.findOne({
            where:{
                uuid: uuid
            }
        })
    }


    async getCourseInfoByCanonicalName(name: string) : Promise<CourseInfo | any> {
        return await this.repo.findOne({
            where:{
                canonicalName: name
            }
        })
    }

    async updateCareerPathImage(id: string, query: ImageTypeEnum ,file) : Promise<CourseInfo | any> {
        const imgid =  await this.imageRepo.saveImage(file);
        const data : ImageData = {
            id: imgid,
            filename: file.originalname,
            mimeType: file.mimetype,
            imageType: query
        }
        const courseInfo = await this.repo.findOne(id);
        if(data.imageType == ImageTypeEnum.CARD) {
            await this.repo.updateOne({ _id: new ObjectID(id) },{$set: { thumbnailUrl: data.filename }});
        }
        let imgs = courseInfo.careerPathImg==undefined?  [] : courseInfo.careerPathImg;
        if(!Array.isArray(imgs)){
            imgs = [imgs];
        }
        Logger.log(`Got the following from request ${JSON.stringify(data)}`)
        console.log(`Data ${JSON.stringify(imgs)}`)
        _.remove(imgs, img => {
            return data.imageType === img.imageType;
        })
        imgs.push(data);

        return await this.repo.updateOne({ _id: new ObjectID(id) },{$set: { careerPathImg: imgs }});
    }

    async addRelatedProgram(id: string , related: string[] | string ) : Promise<CourseInfo | any> {
        Logger.log(`Adding related program for id : ${id} and with related program ${related}`,"addRelatedProgram");
        const courseInfo = await this.repo.findOne(id);
        if(courseInfo===undefined){
            Logger.error(`No course info fetched for the course id : ${id}`)
        }

        const relatedPrograms = courseInfo.relatedPrograms||[];
        Logger.debug(`currentList of program available  ${relatedPrograms}`)
        if(Array.isArray(related)){
            related.forEach(p => {
                relatedPrograms.push(p)
            });
        }else {
            relatedPrograms.push(related)
        }
        /**
         * Fix here later to analyze if update succeeded and return their proper message.
         */
        return await this.repo.updateOne({ _id: new ObjectID(id) },{$set: { relatedPrograms: relatedPrograms }});
    }

    async getAllRelatedCourseInfo(related: RelatedRequestDto): Promise<CourseInfo [] | any>{
        // check if related array has value
        if(related===undefined || related ===null|| related.relatedPrograms.length==0){
            return new BadDataException(400,`Array relatedPrograms can't be empty  or null`, 400);
        }
        let ids;
        if (typeof related.relatedPrograms !== 'string') {
            ids =  related.relatedPrograms.map(i => new ObjectID(i));
        }else {
             ids = new ObjectID(related.relatedPrograms)
        }
        Logger.log(`Fetching data from database for following ids : ${ids}`)
        return await this.repo.find({
            where: {
                _id: {$in: ids}
            }
        });
    }


    /*
        Get the image data for the image
     */

    async getImageData(id: string, img: string, res) : Promise<ImageData | any> {
         const images  = await this.repo.findOne(id, {
                select: ['careerPathImg'],
         });
         const imgData = images.careerPathImg.filter(image => image.filename==img ).pop();


        await this.imageRepo.getImageByName(img).on('data', data=> {
            res.send({data: 'data:'+imgData.mimeType+';base64,'+ data.toString('base64')});
        }).on('finish', data=> {
            //
        });


       //return images.filter
    }

}
