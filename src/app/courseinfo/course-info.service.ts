import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CourseInfoRepository } from '../../repository/courseinfo.repository';
import { CourseInfo } from '../../model/courseinfo.entity';
import _ from 'lodash';
import { StatusEnum } from '../../model/enums/status.enum';
import { User } from '../../model/user.entity';
import { CourseCodeService } from '../../app/coursecode/course-code.service';
import { CourseCodes } from '../../model/coursecode.entity';
import { BadDataException } from '../../exceptions/bad.data.exception';
import { CourseReview } from '../../model/course.review';


@Injectable()
export class CourseInfoService {
    constructor(private repo: CourseInfoRepository, private courseCodeService: CourseCodeService) {
    }

    getAllCourseInfo(options:{}={}): Promise<CourseInfo[]> {
        if(_.isEmpty(options)) {
            options = { status: StatusEnum.ACTIVE }
        }
        return this.repo.find(options);
    }

    /**
     * Get a particular course info using the course id
     * @param id
     * @return {@CourseInfo}
     */
    getCourseById(id: string): Promise<CourseInfo>{
        return this.repo.findOne(id)
    }

    async saveCourse(courseInfo: CourseInfo, user: User) : Promise<CourseInfo> {

        if (courseInfo == null) {
            throw new BadRequestException(('Empty Body Kindly check body'))
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
        if(courseInfo.shortDescription.length<200){
            Logger.error(`CourseInfo is too short, kindly provide the valid`);
            throw  new BadDataException(400,`CourseInfo is too short, kindly provide the valid`, 400);
        }
        courseInfo.approved = false;
        courseInfo.internalRating = courseInfo.internalRating == undefined ? 0 : courseInfo.internalRating;
        courseInfo.externalRating = courseInfo.externalRating == undefined ? 0 : courseInfo.externalRating;



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
        courseReview.reviewDate = (courseReview.reviewDate==undefined|| courseReview.reviewDate ==null)? new Date(): courseReview.reviewDate;
        courseReview.status = (courseReview.status==undefined|| courseReview.status ==null)?StatusEnum.NEW:courseReview.status;
        rev.push(courseReview);
        const result = await this.repo.updateOne({ courseCode : course.courseCode }, { $set: { reviews: rev } });
        Logger.log(result)
        return await this.repo.findOne(courseId);
    }

    approveCourseInfo(courseId: string, user: User) : boolean| void {
            //
    }

    async saveImage(image): Promise<any> {

    }




}
