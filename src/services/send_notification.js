import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";
import config from "../config/config.js";

const sendNotification = async (message) => {
  console.log("Sending email");
  try {
    const mailersend = new MailerSend({
      apiKey:
        "mlsn.7a06f399897d4b61bd26d6425be731dd3e60189e7f23e07a0005eb02453d8391",
    });

    const sentFrom = new Sender(
      "MS_ZrsYsw@trial-7dnvo4dpxj645r86.mlsender.net",
      "Coodesh"
    );

    const recipient = config.notification_recipient_email;
    const recipients = [new Recipient(recipient, "Recipient")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Testing MailerSend").setHtml(`<div>
        <h1>Notification</h1>
        <h2>Update diário dos produtos</h2>
        <h3>Ocorreu um erro ao tentar fazer o o upload diário dos produtos, segue a mensagem de erro</h3>
        <p>${message}</p>
        </div>`);

    await mailersend.email.send(emailParams);

    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default sendNotification;
