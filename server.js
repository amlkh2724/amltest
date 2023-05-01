import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors'
import user from "./routes/transfersroutes.js";
// import accountRoutes from "./routes/accountRoutes.js";
import colors from "colors";

dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();

// 👇️ configure CORS
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hi");
});
const PORT = process.env.PORT || 5000;
app.use("/users", user);
// app.use("/accounts", accountRoutes);
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
