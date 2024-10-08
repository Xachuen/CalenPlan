// Sockets
import { Server } from "socket.io";
import { createServer } from "http";

// Environment
import { config } from "dotenv";

// Socket
import express from "express";

// Json Parser
import bodyParser from "body-parser";

//Allow requests from different ports.
import cors from "cors";

// Load environment variables from .env.local
config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies
app.use(bodyParser.raw({ type: "application/json" }));

// Mongo DB set up.
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
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

// Server Creation
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.put("/api/user-data", async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const { curCalendar, calendar_data } = req.body;

  console.log("You are putting in the backend!");
  console.log(`Putting in ${curCalendar}`);

  console.log(calendar_data);
  if (!curCalendar || !calendar_data) {
    return res
      .status(400)
      .json({ message: "userId and calendar_data are required" });
  }

  try {
    const result = await userDataCollection.updateOne(
      { user_email: curCalendar },
      {
        $set: { calendar_data: calendar_data },
      }
    );

    if (result.matchedCount > 0) {
      console.log("this should happen");
      res.json({ message: "Successfully saved.", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error("Error updating calendar data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

app.post("/api/user-data", async (req, res) => {
  console.log("You are posting in the backend!");

  const { userDataCollection } = await connectToDatabase();
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
      address: "",
    });

    userData = await userDataCollection.findOne({ user_id: userId });
  }

  res.json(userData);
});

app.delete("/api/user-data/:userId/events", async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const { curCalendar, date, hour, index } = req.body;

  try {
    await userDataCollection.updateOne(
      { user_email: curCalendar },
      {
        $unset: { [`calendar_data.${date}.${hour}.${index}`]: "" },
      }
    );

    await userDataCollection.updateOne(
      { user_email: curCalendar },
      {
        $pull: { [`calendar_data.${date}.${hour}`]: null },
      }
    );

    await userDataCollection.updateOne(
      {
        user_email: curCalendar,
        [`calendar_data.${date}.${hour}`]: { $exists: true, $size: 0 },
      },
      {
        $unset: { [`calendar_data.${date}.${hour}`]: "" },
      }
    );

    await userDataCollection.updateOne(
      {
        user_email: curCalendar,
        [`calendar_data.${date}`]: { $exists: true, $eq: {} },
      },
      {
        $unset: { [`calendar_data.${date}`]: "" },
      }
    );

    // Fetch the updated calendar data
    const newData = await userDataCollection.findOne(
      { user_email: curCalendar },
      { projection: { calendar_data: 1 } } // Only retrieve calendar_data
    );
    res.status(200).json(newData);
  } catch (error) {
    console.error("Error deleting calendar data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Address Changing
app.put("/api/user-data/:userId/address", async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const { newAddress } = req.body;
  const userId = req.params.userId;

  try {
    const result = await userDataCollection.updateOne(
      { user_id: userId },
      {
        $set: { address: newAddress },
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
      res.json({ message: "Friend request sent successfully", success: true });
    } else {
      res.json({
        messsage: "Failed to send a request to someone.",
        success: false,
      });
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
app.post("/api/members/", async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const { curCalendar } = req.body;

  console.log("hello world.");
  console.log(curCalendar);
  try {
    const userData = await userDataCollection.findOne({
      user_email: curCalendar,
    });
    if (userData) {
      console.log(userData.members);
      res.status(200).json(userData.members);
    }
  } catch (error) {
    res.status(500).json({ message: "Could not fetch members." });
  }
});

app.post("/api/user-data/:userId/members/add", async (req, res) => {
  const { friendEmail, userEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  try {
    // Add members, then add to accessed calendars
    const accepterResult = await userDataCollection.updateOne(
      { user_email: userEmail },
      {
        $addToSet: { members: friendEmail },
      }
    );

    const addedResults = await userDataCollection.updateOne(
      { user_email: friendEmail },
      {
        $addToSet: { accessedCalendars: userEmail },
      }
    );

    console.log("Success! Added member");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user-data/:userId/members/remove", async (req, res) => {
  const { deletedMemberEmail, userEmail } = req.body;
  const { userDataCollection } = await connectToDatabase();

  // When the user rejects the friend request, the database updates for both the requester and the accepter.
  try {
    const userResult = await userDataCollection.updateOne(
      { user_email: userEmail },
      {
        $pull: { members: deletedMemberEmail },
      }
    );

    const removedResult = await userDataCollection.updateOne(
      { user_email: friendEmail },
      {
        $pull: { accessedCalendars: userEmail },
      }
    );

    console.log("Success! removed friend.");
  } catch (error) {
    console.error("Error removing friend.:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Switching
app.post("/api/user-data/:userId/events", async (req, res) => {
  const { userDataCollection } = await connectToDatabase();
  const { userEmail } = req.body;

  let userData = await userDataCollection.findOne({ user_email: userEmail });

  if (!userData) {
    res.status(404).json({ message: "User not found" });
  }

  res.json({
    eventsData: userData.calendar_data,
    members: userData.members,
  });
});

io.on("connection", (socket) => {
  console.log(`Connected, connected, you just got connected! ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}`);
  });

  // Rooms
  socket.on("joinRoom", (emailRoom) => {
    socket.join(emailRoom);
    console.log(`Welcome ${socket.id} to ${emailRoom}`);
  });

  // Posting events
  socket.on("postEvent", (emailRoom, eventInformation, senderEmail) => {
    console.log(
      `emit creation reflection to the room ${emailRoom} from the sender ${senderEmail}`
    );
    console.log(io.sockets.adapter.rooms.get(emailRoom));
    io.to(emailRoom).emit(
      "reflectEventCreation",
      eventInformation,
      senderEmail
    );
  });

  // Deleting Events
  socket.on("deleteEvent", (emailRoom, eventInformation, senderEmail) => {
    console.log(
      `emit deletion reflection to the room ${emailRoom} from the sender ${senderEmail}`
    );
    console.log(io.sockets.adapter.rooms.get(emailRoom));
    io.to(emailRoom).emit(
      "reflectEventDeletion",
      eventInformation,
      senderEmail
    );
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
