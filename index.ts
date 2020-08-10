import { google } from "googleapis";
import { client_email, private_key } from "./gs-api-test-7f8f4db8dd1c.json";

const client = new google.auth.JWT(client_email, null, private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize((err, tokens) => {
  if (err) {
    console.error(err);
    return;
  }

  gsRun(client);
  console.log("Connected");
});

const gsRun = async (cl) => {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const options = {
    spreadsheetId: "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ",
    range: "Data!A2:B5",
  };

  let response = await gsapi.spreadsheets.values.get(options);

  let dataArray = response.data.values;
  dataArray.push([5, "Boom"]);
  let newDataArray = dataArray;

  const updateOptions = {
    spreadsheetId: "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ",
    range: "Data!E2",
    valueInputOption: "USER_ENTERED",
    resource: { values: newDataArray },
  };

  let res = await gsapi.spreadsheets.values.update(updateOptions);

  console.log(res);

  let newResp = await gsapi.spreadsheets.batchUpdate({
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: { title: "Test" },
          },
        },
      ],
    },
    spreadsheetId: "1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ"
  });

  console.log(newResp);
};
