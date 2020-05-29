import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { PurchasedCourse } from '../../model/purchasedcourse.entity';
// import *  as fast from 'fast-json-patch';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PurchasedCourseService {
  constructor(
    @InjectRepository(PurchasedCourse)
    private readonly PurchasedCourseRepository: MongoRepository<
      PurchasedCourse
    >,
  ) {}

  async findById(id: string): Promise<PurchasedCourse | undefined> {
    const result = await this.PurchasedCourseRepository.findOne(id);
    return result;
  }

  async findAll(): Promise<PurchasedCourse[]> {
    return this.PurchasedCourseRepository.find();
  }

  async find(id: string): Promise<PurchasedCourse | undefined> {
    const result = await this.PurchasedCourseRepository.findOne(id);
    return result;
  }

  async create(purchasedCourse: PurchasedCourse): Promise<PurchasedCourse> {
    return this.PurchasedCourseRepository.save(purchasedCourse);
  }

  async save(
    purchasedCourse: PurchasedCourse,
  ): Promise<PurchasedCourse | undefined> {
    const result = await this.PurchasedCourseRepository.save(purchasedCourse);
    return result;
  }

  async update(
    purchasedCourse: PurchasedCourse,
  ): Promise<PurchasedCourse | undefined> {
    return await this.save(purchasedCourse);
  }

  async delete(
    purchasedCourse: PurchasedCourse,
  ): Promise<PurchasedCourse | undefined> {
    return await this.PurchasedCourseRepository.remove(purchasedCourse);
  }
}
