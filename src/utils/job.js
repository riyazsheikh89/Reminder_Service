const cron = require('node-cron');
const EmailService = require('../services/email-service');
const sender = require('../config/emailConfig');

const setupJob = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await EmailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                // text: email.content,         // plain text body 
                html: `<h3>${email.content}?</h3>`, // html body
            }, async (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                   await EmailService.updateTicket(email.id, {status: "SUCCESS"});
                }
            })
        });
    });
}

module.exports = setupJob;