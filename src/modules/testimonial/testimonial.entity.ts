import {  Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "../../model/enums/status.enum";
import { BaseEntity } from "../../model/base/base.entity";

@Entity('testimonials')
export class Testimonial extends BaseEntity{

    @ApiProperty({description: 'Name of Client'})
    @Column()
    clientName: string;

    @ApiProperty({description: 'Image URL or hash'})
    @Column()
    imageUrl: string;

    @ApiProperty({description: 'Position Title of client'})
    @Column()
    clientTitle:string;

    @ApiProperty({description: 'Company Name'})
    @Column()
    clientCompany: string;

    @ApiProperty({description: 'formatted String of testimonial'})
    @Column()
    testimonial: string;

    @ApiProperty({description: 'Status of the Testimonial'})
    @Column()
    status: StatusEnum;
}
