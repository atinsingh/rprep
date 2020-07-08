import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Testimonial} from "./testimonial.entity";
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { SharedModule } from '../shared/shared.module';


@Module({
    imports: [TypeOrmModule.forFeature([Testimonial]), SharedModule],
    exports: [],
    controllers: [TestimonialController],
    providers: [TestimonialService]
})
export class TestimonialModule {

}
