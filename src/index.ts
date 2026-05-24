import express from "express";
import cors from "cors";
import eventRouter from "./routes/eventroute.js";
import categoryRouter from "./routes/categoryroute.js";
import speakerRouter from "./routes/speakerroute.js";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://frontend-event-sand.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// CORS harus sebelum routes
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Event API berjalan");
});

// routes
app.use(categoryRouter);
app.use(eventRouter);
app.use(speakerRouter);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});