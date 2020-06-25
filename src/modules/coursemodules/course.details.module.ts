import { Module } from "@nestjs/common";
import { CourseModulePlanService } from './course.module.plan.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CourseModulePlanEntity} from "../../model/course.module.plan.entity";
import {CourseModulePlanController} from "./course.module.plan.controller";
import {CourseModule} from "../course.module";

@Module({
  imports: [TypeOrmModule.forFeature([CourseModulePlanEntity]), CourseModule],
  providers: [CourseModulePlanService],
  controllers: [CourseModulePlanController]
})
export class CourseDetailsModule {

}
