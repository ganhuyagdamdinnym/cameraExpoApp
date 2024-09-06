import { adjustValues } from "./dataProgress";

export const googleFetch = async (name: string) => {
  const apiKey = "AIzaSyC9ytsYSMCrSLP585aDOabyjHbmn7BEgIg";
  const spreadsheetId = "1AhQcznNLyniAHEQgv5TXQ91hN63qqbIsC-RD-gRbZd0";
  let range = "";

  if (name === "user") {
    range = "1:3";
  } else if (name === "product") {
    range = "'Шийт2'!A:B";
  } else {
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("error");
    }
    const data = await response.json();
    console.log("data", data);
    const progressed = adjustValues(data.values);
    console.log("progress", progressed);
    return data.values;
  } catch (eerr) {
    console.log(eerr);
    return null;
  }
};
