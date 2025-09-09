import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

const rooms = [
    {
        number: 101,
        floor: 1,
    },
    {
        number: 102,
        floor: 1,
    },
    {
        number: 103,
        floor: 1,
    },
    {
        number: 104,
        floor: 1,
    },
    {
        number: 105,
        floor: 1,
    },
    {
        number: 201,
        floor: 2,
    },
]

async function saveToDb(room) {
    await prisma.room.upsert({
        where: { number: room.number },
        update: {},
        create: room
    }).then((result) => {
        if (result) {
            console.log(`Room ${room.number} done.`);
        }
    })

}

async function addAllToDb() {
    try {
        await Promise.all(
            rooms.map((room) => saveToDb(room))
        );
    } catch (e) {
        console.log("Error while saving data -", e);
    } finally {
        await prisma.$disconnect();
    }
}

// addToDb();