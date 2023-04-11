import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
let apiInstance;
let sendSmtpEmail;
@Injectable()
export class MailService {
  
  constructor(
    private i18n: I18nService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {
    apiKey.apiKey = configService.get<string>('MAIL_API_KEY');
    apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  }
  
  async sendEmail(email: string, file: string) {
    sendSmtpEmail = {
      to: [
        {
          email: email,

          name: email,
        },
      ],
      templateId: 1,
      headers: {
        'X-Mailin-custom':
          'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      },
    };

    //add file atachments to email
    if (file) {
      sendSmtpEmail.attachment = [
        {
          name: 'invontory.pdf',
          content: file,
          filename: 'invontory.pdf',
          contentType: 'application/pdf',
        },
      ];
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('API called successfully. Returned data: ' + data);
      },
      function (error) {
        console.error(error);
      },
    );
  }
}
