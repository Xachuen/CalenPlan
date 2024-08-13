import { config } from 'dotenv';
import express from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser";

// Mongo DB set up.
import { MongoClient } from 'mongodb';
const uri = "mongodb://localhost:27017/CalenPlan";
const dbClient = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB");
        const database = dbClient.db('CalenPlan'); 
        const userDataCollection = database.collection('UserData'); 
        return { database, userDataCollection };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Load environment variables from .env.local
config({ path: '.env.local' });

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.raw({ type: "application/json" }));

// Define your webhook route
app.post("/api/webhooks", async (req, res) => {
    const { database, userDataCollection } = await connectToDatabase();
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("You need a WEBHOOK_SECRET in your .env.local");
    }

    const headers = req.headers;
    const payload = req.body;

    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).send("Error occurred -- no svix headers");
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.log("Error verifying webhook:", err.message);
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", evt.data);

    const result = await userDataCollection.insertOne(evt.data); 
    console.log(result);

    return res.status(200).json({
        success: true,
        message: "Webhook received",
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
