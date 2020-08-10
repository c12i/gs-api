import { google } from "googleapis";
import { client_email, private_key } from "./gs-api-test-7f8f4db8dd1c.json";

export class GoogleSheets {
  spreadsheetId = "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ";

  private init() {
    const client = new google.auth.JWT(client_email, null, private_key, [
      "https://www.googleapis.com/auth/spreadsheets",
    ]);
    return client;
  }

  async createSheet(title: string) {
    const client = this.init();
    client.authorize(async (error, result) => {
      if (error) {
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
        spreadsheetId: this.spreadsheetId,
      });
      console.log(response);
      return response;
    });
  }

  async update<T>(sheet: string, values: T[]) {
    const client = this.init();
    client.authorize(async (error, result) => {
      if (error) {
        return console.error(error);
      }
      const gsapi = google.sheets({ version: "v4", auth: client });
      const updateOptions = {
        spreadsheetId: this.spreadsheetId,
        range: `${sheet}!A1:Z`,
        valueInputOption: "USER_ENTERED",
        resource: { values },
      };
      let response = await gsapi.spreadsheets.values.update(updateOptions);
      console.log(response);
      return response;
    });
  }

  async getValues(sheet: string) {
    const client = this.init();
    client.authorize(async (error, result) => {
      if (error) {
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
    });
  }
}

const client = new GoogleSheets();

const run = async () => {
  await client.createSheet("1231d1d1");
}

const update = async () => {
  await client.update("1231d1d1", [
    ["claim id", "1231d1d1"],
    ["patient name", "Collins Muriuki"],
    ["member number", "10234H-H"],
    ["invoice id", "321"],
    ["diagnosis", ["Malaria", "Angular Stomatitis"].toString()],
    ["prescription", ["Panadol", "1px", "od"].toString()],
    ["invoiceTotal", "1000"],
    ["item1", "200"],
    ["item2", "300"],
    ["item3", "250"],
    ["item4", "250"],
  ]);
}
run();
setTimeout(() => {
  update();
}, 3000);
