import { PrismaClient } from "../generated/prisma";

const { GoogleGenAI } = require("@google/genai");
// const { Order } = require("../db");
const uploadServices = require("./uploadServices");
const prisma = new PrismaClient();

async function getAllRooms() {
  const allRooms = await prisma.room.findMany();
  return allRooms;
}


async function getPrevReading(roomNo) {
  // const prevReading = await Order.findOne({ roomNumber: roomNo })
  //   .sort({ orderDate: -1 });

  // const prevReading = await prisma.order.findFirst({
  //   where: {
  //     Room: { number: parseInt(roomNo) }
  //   },
  //   orderBy: {
  //     createdAt: "desc"
  //   }
  // })
  const prevReading=await prisma.room.findFirst({
    where:{
      number:parseInt(roomNo)
    }
  })
  return prevReading?.lastReading || 0;
}

async function getImageUrl(fileName) {
  try {
    const getImageUrl = await uploadServices.getLoadURL(fileName);

    return getImageUrl;
  } catch (e) {
    console.log(e.message)
    throw new Error('' + e.message);
  }

}

async function getMeterReading(fileName, roomNumber) {
  const imageURL = await getImageUrl(fileName);
  const ai = new GoogleGenAI({});

  const response = await fetch(imageURL);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');
  const mimeType = response.headers.get('Content-Type');
  //to get prev bill
  const prevReading = await getPrevReading(roomNumber);


  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: process.env.GEMINI_SYSTEM_PROMPT.replace(/\\n/g, '\n'),

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
  return { output: result.text, prevReading };
}



export default {
  getMeterReading,getAllRooms
}