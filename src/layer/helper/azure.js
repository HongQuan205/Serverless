const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;
const sleep = require("util").promisify(setTimeout);

const azureComputerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({
    inHeader: {
      "Ocp-Apim-Subscription-Key": process.env.AZURE_COMPUTER_VISION_KEY,
    },
  }),
  process.env.AZURE_COMPUTER_VISION_ENDPOINT
);

async function azure(imgUrl) {
  try {
    let result = await azureComputerVisionClient.read(imgUrl);

    const operation = result.operationLocation.split("/").slice(-1)[0];

    while (result.status !== "succeeded") {
      await sleep(1000);
      result = await azureComputerVisionClient.getReadResult(operation);
    }

    return {
      status: true,
      data: customAzureResponse(result.analyzeResult.readResult),
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      data: error.message,
    };
  }
}

function customAzureResponse(azureResponse){
    const result = {
        pages: null,
    }

    const cvData = azureResponse.map((page, pageIndex) =>{
        return {
            index: pageIndex + 1,
            lines: page.lines.map((line) => line.text)
        }
    })
}

module.exports = {
    azure
}