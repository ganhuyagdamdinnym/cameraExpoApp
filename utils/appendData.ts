export const appendData = async (name: string, values: string[][]) => {
  const apiKey = "AIzaSyC9ytsYSMCrSLP585aDOabyjHbmn7BEgIg";
  const spreadsheetId = "1AhQcznNLyniAHEQgv5TXQ91hN63qqbIsC-RD-gRbZd0";
  let range = "";

  if (name === "user") {
    range = "sheet1!A1"; // Starting cell for appending data
  } else if (name === "product") {
    range = "Sheet1!A1"; // Adjust according to your sheet name and starting cell
  } else {
    throw new Error("Invalid name parameter");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&key=${apiKey}`;

  const body = {
    values: values,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error appending data: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Append result", result);
    return result;
  } catch (eerr) {
    console.error("Error:", eerr);
    return null;
  }
};
