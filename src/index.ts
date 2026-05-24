import  express  from "express";
import cors from "cors";
import eventRouter from "./routes/eventroute.js"
import categoryRouter from "./routes/categoryroute.js"
import speakerRouter from "./routes/speakerroute.js"

const app = express();
const port = process.env.PORT || 3000;

// aplikasi utama
app.use(cors());
app.use(express.json());

// penambahan untuk setiap router

// category route
app.use(categoryRouter);

// event route
app.use(eventRouter);

// speaker route
app.use(speakerRouter);


// jalankan server
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});

