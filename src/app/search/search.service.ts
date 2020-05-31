import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CourseInfo } from '../../model/courseinfo.entity';
// import *  as fast from 'fast-json-patch';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
const MongoClient = require('mongodb').MongoClient;
import {config} from '../../app.config'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(CourseInfo)
    private readonly CourseInfoRepository: MongoRepository<CourseInfo>,
  ) {}

    async search(query: string): Promise<any> {
        return new Promise((resolve) => {
            const searchterm = `.*${query}.`;
            MongoClient.connect(config["app.mongodbURL"], function (err, client) {

                client
                  .db(config['app.mongodbDB'])
                  .collection('courseinfo')
                  .find({ courseName: { $regex: searchterm, $options: 'i' } })
                  .toArray()
                  .then(docs => {
                    client.close();
                    resolve(docs);
                  });
            });
        })
  }
}
