const { google } = require("googleapis");
const keys = require("./gs-api-test-7f8f4db8dd1c.json");

class GoogleSheets {
  spreadsheetId = "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ";

  init() {
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    return client;
  }

  async createSheet(title) {
    const client = this.init();
    client.authorize((error, result) => {
      if(error) {
        return console.error(error);
      }
      const gsapi = google.sheets({ version: "v4", auth: client });
      let response = await gsapi.spreadsheets.batchUpdate({
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title },
              },
            },
          ],
        },
        spreadsheetId: this.spreadsheetId
      });
      console.log(response);
      return response;
    })
  }

  async update(sheet, values) {
    const client = this.init();
    client.authorize((error, result) => {
      if(error) {
        return console.error(error);
      }
      const gsapi = google.sheets({ version: "v4", auth: client });
      const updateOptions = {
        spreadsheetId: this.spreadsheetId,
        range: `${sheet}!E2`,
        valueInputOption: "USER_ENTERED",
        resource: { values },
      };
      let response = await gsapi.spreadsheets.values.update(updateOptions);
      console.log(response);
      return response;
    })
  }

  async getValues(sheet) {
    const client = this.init();
    client.authorize((error, result) => {
      if(error) {
        return console.error(error);
      }
      const gsapi = google.sheets({ version: "v4", auth: client });
      const options = {
        spreadsheetId: this.spreadsheetId,
        range: `${sheet}!A2:B5`,
      };
      let response = await gsapi.spreadsheets.values.get(options);
      console.log(response);
      return response;
    })
  }
}
