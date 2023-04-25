import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import betaUser from './templates/betaUser'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * @param to email
   */
  async sendMailBetaUser(to: string) {
    const mail = betaUser()

    await this.mailerService
      .sendMail({
        to,
        from: mail.sender,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      })
      .then((res) => {
        console.log('res', res)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}
