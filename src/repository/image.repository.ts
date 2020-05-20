import { getConnection, MongoClient } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GridFSBucket } from 'mongodb';
import { Duplex } from 'stream';
import { ObjectID } from 'mongodb';

/*
  class to hold the larger images
  or videos, will need to completed
 */

@Injectable()
export class ImageRepository {
  mongoClient;
  app;
  db;

  saveImage(data) : string {
      this.init();
      const file = this.bufferToStream(data.buffer);
      const uploadId = this.app.openUploadStream(data.originalname);
      console.log(uploadId.id);
      file.pipe(uploadId).on(
        'error',err => {
          console.log("failed");}

      ).on('finish', ()=>{
        console.log('done')
      });
      return uploadId.id;

    }

   getImageById(id: string) : any {
    this.init();
    return this.app.openDownloadStream(new ObjectID(id));
  }

  init() {
    this.mongoClient =  (getConnection().driver as any).queryRunner.databaseConnection as MongoClient;
    this.db = this.mongoClient.db('lms')
    this.app = new GridFSBucket(this.db, {bucketName: 'images'});

  }

  bufferToStream(buffer) {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}