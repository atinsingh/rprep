import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base/base.entity';
import { StatusEnum } from './enums/status.enum';

@Entity()
export class Orders extends BaseEntity {

    @ApiProperty({ uniqueItems: true, description: 'Unique Order Id to Display' })
    @Column({ unique: true })
    orderId: string;

    @ApiProperty({description: 'Unique txn no return by gateway' })
    @Column({ unique: true })
    txnNo: string;

    @ApiProperty({ description: 'User ID' })
    @Column({ nullable: false })
    userId: string;

    @ApiProperty({ description: 'Course Id' })
    @Column({ nullable: false })
    courseId: string;

    @ApiProperty({ description: 'amount to be paid' })
    @Column({ nullable: false })
    amount: number;

    @ApiProperty({ description: 'Currency' })
    @Column({ nullable: false })
    currency: string;

    @ApiProperty({ enum: ['FAILED', 'CANCELLED', 'COMPLETED', 'PENDING'],  description: 'status' })
    @Column({ nullable: false })
    status: StatusEnum;

    @Column({ nullable: false })
    createdDate?: Date;
}
