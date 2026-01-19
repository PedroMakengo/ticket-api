import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendMail(email: string, otp: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Plataforma de Gestão de Tickets" <no-reply@example.com>',
      to: email,
      subject: 'Confirme sua conta',
      html: `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirmação de Conta</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table width="100%" max-width="600" style="background:#ffffff; border-radius:8px; padding:24px;">
              
              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <h2 style="color:#1f2937; margin:0;">
                    Confirmação de Conta
                  </h2>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="color:#374151; font-size:16px; line-height:1.6;">
                  <p>Olá 👋,</p>
                  <p>
                    Recebemos uma solicitação para confirmar a sua conta.
                    Utilize o código abaixo para continuar:
                  </p>
                </td>
              </tr>

              <!-- OTP -->
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <div
                    style="
                      display:inline-block;
                      background:#f3f4f6;
                      padding:16px 32px;
                      font-size:28px;
                      letter-spacing:6px;
                      font-weight:bold;
                      color:#111827;
                      border-radius:6px;
                    "
                  >
                    ${otp}
                  </div>
                </td>
              </tr>

              <!-- Footer text -->
              <tr>
                <td style="color:#6b7280; font-size:14px; line-height:1.6;">
                  <p>
                    Este código é válido por alguns minutos.
                    Se não solicitou esta verificação, ignore este e-mail.
                  </p>
                  <p>
                    Obrigado,<br />
                    <strong>Equipe de Suporte</strong>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
    });
  }

  async sendMailTicket(email: string, ticket: string): Promise<void> {}
}
