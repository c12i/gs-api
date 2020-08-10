const { google } = require('googleapis');
const keys = require('./gs-api-test-7f8f4db8dd1c.json');

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key, 
    ["https://www.googleapis.com/auth/spreadsheets"],
);

client.authorize((err, tokens) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected");
})
