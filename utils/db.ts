import { ConnectionStates } from "mongoose";

interface IConnection {
  isConnected: ConnectionStates;
}

const connection: IConnection = {
  isConnected: 0,
};

const connect = async () => {
  try {
    // Dynamically load mongoose
    const mongoose = (await import("mongoose")).default;

    if (connection.isConnected) {
      console.log("Already connected");
      return;
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("Use previous connection");
        return;
      }

      await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("New connection");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error during the connection! ", error);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    // Dynamically load mongoose
    const mongoose = (await import("mongoose")).default;

    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        connection.isConnected = 0;
      } else {
        console.log("Not disconnected");
      }
    }
  } catch (error) {
    console.error("Error during the disconnection! ", error);
    process.exit(1);
  }
};

const coverDocToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
};

export const db = { connect, disconnect, coverDocToObj };
