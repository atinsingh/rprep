import { Module } from '@nestjs/common';
import { DbService } from './db/db.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: []
})
export class SharedModule {}
