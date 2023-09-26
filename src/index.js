const bodyParser = require('body-parser');
const express = require('express');
const cron = require('node-cron')
const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig');
const Jobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');
const { createChannel, subscribeMessage } = require("./utils/message_queue");
const EmailService = require("./services/email-service");

const setupAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    app.post('/api/v1/tickets', TicketController.create);

    // Receiving from Booking Service
    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server Started on PORT: ${PORT}`);
        // Jobs();

    })
}

setupAndStartServer();