import express from "express";
import cors from "cors";
import {config} from "dotenv";
config();
import globalErrorHandler from "./middlewares/error.middleware.js";
import articleRouter from "./routes/article.route.js";
import {connectToMongoDB} from "./configs/mongodb.js";
connectToMongoDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/articles", articleRouter)
app.use(globalErrorHandler);

app.listen(4000, (err) => {
    if (err) console.log("❌ Error Starting The Servier", err);
    else console.log("✅ Server Started At PORT:", process.env.PORT || 4000);
});
