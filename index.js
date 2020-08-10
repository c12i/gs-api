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

    gsRun(client);
    console.log("Connected");
});

const gsRun = async (cl) => {
    const gsapi = google.sheets({version: "v4", auth: cl});

    const options = {
        spreadsheetId: "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ",
        range: "Data!A2:B5",
    }

    let response = await gsapi.spreadsheets.values.get(options);

    console.log(response.data.values);
}
