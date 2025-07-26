const { GoogleGenAI } = require("@google/genai");
const { Order } = require("../db");
const uploadServices = require("./uploadServices");

async function getPrevReading(roomNo) {
  const prevReading = await Order.findOne({ roomNumber: roomNo })
    .sort({ orderDate: -1 });

  if (prevReading) {

    return prevReading.reading; 
  } else {
    return 0;
  }
}

async function getImageUrl(fileName) {
  try {
    const getImageUrl = await uploadServices.getLoadURL(fileName);

    return getImageUrl;
  } catch (e) {
    console.log(e.message)
     throw new Error('' + err.message);
  }

}

async function getMeterReading(fileName,roomNumber) {
  const imageURL = await getImageUrl(fileName);
  console.log("code reached getMeterReading part " + imageURL)
  const ai = new GoogleGenAI({});

  const response = await fetch(imageURL);
  console.log(response)
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');
  const mimeType = response.headers.get('Content-Type');
  //to get prev bill
  const prevReading = await getPrevReading(roomNumber);


  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: process.env.GEMINI_SYSTEM_PROMPT,
    },

    contents: [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageData,
        },
      },
      { text: "What is the electricity reading of the meter attached in the meter?" }
    ],
  });
  return {output:result.text,prevReading};
}



module.exports={
    getMeterReading
}