import express from "express"
import cors from "cors"
import globalErrorHandler from "./middlewares/error.middleware";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(globalErrorHandler());
 

app.listen(4000, ()=> console.log("Server started at POR:", 4000))