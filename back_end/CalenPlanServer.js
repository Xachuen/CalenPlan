// Sockets
import { Server } from "socket.io";
import { createServer } from "http";

// Environment
import { config } from "dotenv";

// Socket
import express from "express";

//Svix
import { Webhook } from "svix";

// Json Parser
import bodyParser from "body-parser";

//Allow requests from different ports.
import cors from "cors";

// Mongo DB set up.
import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017/CalenPlan";
const dbClient = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await dbClient.connect();
    console.log("Connected to MongoDB");
    const database = dbClient.db("CalenPlan");
    const userDataCollection = database.collection("UserData");
    return { database, userDataCollection };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Load environment variables from .env.local
config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies
app.use(bodyParser.raw({ type: "application/json" }));

// Server Creation
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

  console.log(result);

  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
});

app.get("/api/user-data", async (req, res) => {
  console.log("Hello! You just entered the backend!");
  const { database, userDataCollection } = await connectToDatabase();
  const { userEmail } = req.body;
  console.log(userEmail);
  const userId = req.query.userId;

  let userData = await userDataCollection.findOne({ user_id: userId });

  // If userData does not exist, we create one.
  if (!userData) {
    console.log("Did not find user data, creating instead.");
    await userDataCollection.insertOne({
      _id: userId,
      user_id: userId,
      friends: [],
      active: true,
      calendar_data: {},
    });

    userData = await userDataCollection.findOne({ user_id: userId });
  }

  res.json(userData);
});

app.put("/api/user-data", async (req, res) => {
  console.log("You are putting in the backend!");

  const { database, userDataCollection } = await connectToDatabase();
  const { userId, calendar_data } = req.body;

  console.log(userId);
  console.log(calendar_data);
  if (!userId || !calendar_data) {
    return res
      .status(400)
      .json({ message: "userId and calendar_data are required" });
  }

  try {
    const result = await userDataCollection.updateOne(
      { user_id: userId },
      {
        $set: { calendar_data: calendar_data },
      }
    );

    if (result.matchedCount > 0) {
      res.json({ message: "Calendar data updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating calendar data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user-data", async (req, res) => {
  console.log("You are posting in the backend!");

  const { database, userDataCollection } = await connectToDatabase();
  const { userId, userEmail } = req.body;

  let userData = await userDataCollection.findOne({ user_id: userId });

  // If userData does not exist, we create one.
  if (!userData) {
    console.log("Did not find user data, creating instead.");
    await userDataCollection.insertOne({
      _id: userId,
      user_id: userId,
      user_email: userEmail,
      friends: [],
      friend_requests: [],
      members: [userEmail],
      accessedCalendars: [userEmail],
      active: true,
      calendar_data: {},
    });

    userData = await userDataCollection.findOne({ user_id: userId });
  }

  res.json(userData);
});

// Handling Friend Requests
app.post("/api/user-data/:userId/friends/requests", async (req, res) => {
  const { userEmail, requestedFriend } = req.body;
  const { userDataCollection } = await connectToDatabase();

  try {
    const result = await userDataCollection.updateOne(
      { user_email: requestedFriend },
      {
        $addToSet: { friend_requests: userEmail },
      }
    );

    if (result.matchedCount > 0) {
      res.json({ message: "Friend request sent successfully" });
    } else {
      console.log("Could not find anything");
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user-data/:userId/friends/requests/accept", async (req, res) => {
  const { accepterEmail, requesterEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  // When the user accepts the friend request, the database updates for both the requester and the accepter.
  try {
    const accepterResult = await userDataCollection.updateOne(
      { user_email: accepterEmail },
      {
        $addToSet: { friends: requesterEmail },
        $pull: { friend_requests: requesterEmail },
      }
    );

    const requesterResult = await userDataCollection.updateOne(
      { user_email: requesterEmail },
      {
        $addToSet: { friends: accepterEmail },
        $pull: { friend_requests: accepterEmail },
      }
    );
    console.log("Success! Added friends.");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user-data/:userId/friends/requests/reject", async (req, res) => {
  const { rejecterEmail, requesterEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  // When the user rejects the friend request, the database updates for both the requester and the accepter.
  try {
    const rejecterResult = await userDataCollection.updateOne(
      { user_email: rejecterEmail },
      {
        $pull: { friend_requests: requesterEmail },
      }
    );

    const requesterResult = await userDataCollection.updateOne(
      { user_email: requesterEmail },
      {
        $pull: { friend_requests: rejecterEmail },
      }
    );
    console.log("Success! Reject friend.");
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user-data/:userId/friends/delete", async (req, res) => {
  const { deletedFriendEmail, userEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  // When the user rejects the friend request, the database updates for both the requester and the accepter.
  try {
    const userResult = await userDataCollection.updateOne(
      { user_email: userEmail },
      {
        $pull: { friends: deletedFriendEmail },
      }
    );

    const friendResult = await userDataCollection.updateOne(
      { user_email: deletedFriendEmail },
      {
        $pull: { friends: userEmail },
      }
    );
    console.log("Success! Deleted friend.");
  } catch (error) {
    console.error("Error deleting friend.:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Members
app.post("/api/user-data/:userId/members/add", async (req, res) => {
  const { friendEmail, userEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  try {
    const accepterResult = await userDataCollection.updateOne(
      { user_email: userEmail },
      {
        $addToSet: { members: friendEmail },
      }
    );

    console.log("Success! Added member");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

io.on("connection", (socket) => {
  console.log("Connected, connected, you just got connected!");
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
