const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');

const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server Started on PORT: ${PORT}`);

        sendBasicEmail(
            'reminderservice.airline@gmail.com',
            'wbriyaz75@gmail.com',
            'testing email reminder service',
            'this is a test mail for airline reminder service, hope it will work fine, thnk you!'
        )
    })
}

setupAndStartServer();