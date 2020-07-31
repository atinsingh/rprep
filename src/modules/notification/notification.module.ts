import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { NotificationService } from './notification.service';

@Module({
    imports: [
      MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'info@bulsoft.com',
                pass: 'P@ssw0rd11'
            }
        },
        defaults: {
            from:'"NEW INQURIY" <info@pragra.io>',
        },
        template: {
            dir: __dirname + '/templates',
            adapter: new PugAdapter(),
            options: {
                strict: true,
            },
        },
    })
    ],
    providers:[NotificationService],
    exports: [NotificationService]
})
export class NotificationModule {

}