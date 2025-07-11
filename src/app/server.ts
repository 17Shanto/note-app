import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
let server: Server;
let PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:mongodb@cluster0.puxiv5c.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB using mongoose");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
