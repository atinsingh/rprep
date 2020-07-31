import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactDto } from '../contact/contact.dto.entity';

@Injectable()
export class NotificationService {
    
    constructor(private mailService: MailerService){}

    public sendNewContactEmail(contactDto: ContactDto): void{
        Logger.log(`Sending Email Notification for contact ${contactDto.firstname}`)
        this.mailService.sendMail({
            to: 'sales@pragra.co;info@pragra.co',
            from: 'no-reply@pragra.co',
            subject: `A new contact created from ${contactDto.firstname} `,
            template: 'contact',
            context: {
                contact: contactDto
            }
        }).then(success=>{
            Logger.debug("Email sent successfully")
        }).catch(err=>{
            Logger.log(err)
        })
    }
}