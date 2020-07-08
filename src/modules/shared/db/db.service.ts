import { Injectable } from '@nestjs/common';
import { getConnection, MongoClient, Db } from "typeorm";
import { config } from "../../../app.config";


@Injectable()
export class DbService {
    mongoClient: MongoClient;
    db : Db;
    constructor() {
        this.mongoClient =  (getConnection().driver as any).queryRunner.databaseConnection as MongoClient;
        this.db = this.mongoClient.db(config.get('app.db'))
    }

     getDb() : Db {
        return this.db;
    }


}
