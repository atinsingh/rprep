import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Testimonial} from "./testimonial.entity";
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';


@Module({
    imports: [TypeOrmModule.forFeature([Testimonial])],
    exports: [],
    controllers: [TestimonialController],
    providers: [TestimonialService]
})
export class TestimonialModule {

}
