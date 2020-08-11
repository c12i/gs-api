import { GoogleSheets } from "./src/sheets";

const client = new GoogleSheets("1ILfI5V5ZU9lt3Wqcr_gdRqDVqL2nymtQZNj8toF5EqQ");

const rng = (Math.round(Math.random()*1000)).toString();

const dummyData = [
  ["id", rng],
  ["name", "Collins Muriuki"],
  ["number", "10234H-H"],
  ["test id", "321"],
  ["Languages", ["English", "German"].toString()],
  ["item1", "200"],
  ["item2", "300"],
  ["item3", "250"],
  ["item4", "250"],
  ["total", "1000"],
]

client.postToGoogleSheets(rng, dummyData);