import { Injectable } from '@nestjs/common';
import Hubspot from 'hubspot';
import { ContactDto } from './contact.dto.entity';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';

import { MongoRepository } from 'typeorm';
@Injectable()
export class ContactService {

  constructor(@InjectRepository(ContactDto) private readonly repository: MongoRepository<ContactDto>) {
  }

  async createContact(contact: ContactDto) : Promise<any> {
      contact.address = contact.address||'';
      contact.status = 0;
      contact.createdDate = new Date();
    // const hub = new Hubspot({
    //   apiKey:'9365d891-a89d-46e9-b240-1ddede5d3cfe'
    // });
    //
    // const data = {
    //   properties:
    //      _.keysIn(contact).map(d=>{return {'property': d, 'value': contact[d]}})
    // };
    // console.log(JSON.stringify(data))
    // return hub.contacts.create(JSON.stringify(data));
    return await  this.repository.save(contact);

  }
}
