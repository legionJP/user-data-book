// require('dotenv').config();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./backend/config/db.js";
import path from 'path'
import userRoutes from "./backend/router/userRouter.js";
import tableRouter from "./backend/router/tableRouter.js";
import entityRouter from './backend/router/entityRouter.js'
import cors from "cors";
import morgan from 'morgan'
dotenv.config();
connectDB();

const app = express();
app.use(cors({}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json());

// app.get("/", (_, res) => { res.send("Hello World!") });

app.use("/api/user", userRoutes);
app.use("/api/table", tableRouter);
app.use("/api/entity", entityRouter);

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send("API IS RUNNING");
  })
}

app.listen(PORT, () => { console.log(`Example app listening on port ${PORT}`); });
