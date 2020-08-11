import { GoogleSheets } from "./src/sheets";

const client = new GoogleSheets("1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ");

const s = (Math.round(Math.random()*100)).toString();

const dummyData = [
  ["claim id", s],
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
]

client.postToGoogleSheets(s, dummyData);