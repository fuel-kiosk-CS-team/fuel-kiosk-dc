import { createTransport } from 'nodemailer';

import { FuelTicketEmail } from './emailTemplates/FuelTicketEmail';
import { TotalizerErrorEmail } from './emailTemplates/TotalizerErrorEmail';
import { UnexpectedFuelFlowEmail } from './emailTemplates/UnexpectedFuelFlowEmail';

const transporter = createTransport({
    host: "mail.engr.oregonstate.edu",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        ciphers: 'SSLv3',
    },
})

export async function sendEmailText(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: `"Fuel Kiosk" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });

        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export async function sendEmailHTML(to, subject, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Fuel Kiosk" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export async function sendFuelTicketEmail(to, data) {
    const ReactDomServer = (await import('react-dom/server')).default;

    const emailHTML = ReactDomServer.renderToStaticMarkup(
        <FuelTicketEmail {...data} />
    );

    sendEmailHTML(to, `Fuel Ticket: ${data.loc_code}${data.eq_no ? `-${data.eq_no}` : ''}`, emailHTML);
}

export async function sendTotalizerErrorEmail(to, data) {
    const ReactDomServer = (await import('react-dom/server')).default;

    const emailHTML = ReactDomServer.renderToStaticMarkup(
        <TotalizerErrorEmail {...data} />
    );

    sendEmailHTML(to, 'Totalizer Reading Error', emailHTML);
}

export async function sendFuelFlowErrorEmail(to, data) {
    const ReactDomServer = (await import('react-dom/server')).default;

    const emailHTML = ReactDomServer.renderToStaticMarkup(
        <UnexpectedFuelFlowEmail {...data} />
    );

    sendEmailHTML(to, `Unexpected Fuel Flow: ${data.loc_code}`, emailHTML);
}