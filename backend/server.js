require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const server = require("http").createServer(app);
const socketServer = require("./socketServer");
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || 5000;
const router = require("./routes");


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);


app.use(express.json());
app.use(cookieParser());
app.use(router);


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} and Database connected...`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

