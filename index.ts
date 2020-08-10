import { GoogleSheets } from "./src/sheets";

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
