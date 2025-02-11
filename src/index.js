import express from "express";
import morgan from "morgan";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/apiRoutes.js";
import connectDB from "./config/dbConfig.js";
import cookieParser from "cookie-parser";

const app = express();

console.log(import.meta);

app.set('view engine', 'ejs');
app.set('views', (import.meta.dirname + '/views'));

app.use(morgan("combined"));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);//if the req url start with /api, use apiRouter

app.get('/', (req, res) => {
    res.render('home', {name: 'John Doe'}); 
  });

app.get("/ping", (req, res) => {
    return res.json({ 
        message: "pong" 
    });
}); 

app.all("*", (req, res) => {
    return res.status(404).json({ 
        message: "Route not found" 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
 
