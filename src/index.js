const bodyParser = require('body-parser');
const express = require('express');
const cron = require('node-cron')
const {PORT} = require('./config/serverConfig');
const Jobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');

const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server Started on PORT: ${PORT}`);
        Jobs();

    })
}

setupAndStartServer();