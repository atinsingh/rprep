import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Testimonial } from "./testimonial.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class TestimonialService {
    constructor(@InjectRepository(Testimonial) private repo: MongoRepository<Testimonial>) {}

    async createTestimonial(entity: Testimonial): Promise<Testimonial> {
        // @Geetu add validation here.
        return await this.repo.save(entity);
    }

    async getAllTestimonialWithSelection(option:{}={}) : Promise< Testimonial[] > {
        return await this.repo.find(option);
    }

    async createMultiTestimonial(testimonials : Testimonial [])  : Promise<Testimonial []> {
        // @Geetu please add validation
        testimonials.forEach(t=>t.createdDate=new Date());
        return this.repo.save<Testimonial>(testimonials);
    }

    // add findOne

    // updateOne
    // updateAll
    // deleteOne
    // deleteMany
    // approve it.
}
