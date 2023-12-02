import  Express  from "express";
import colors from 'colors';
import dotenv from "dotenv";
import morgan from "morgan";
import dbconnect from "./config/db.js";
import authroute from './routes/authRoutes.js'
import categoryroute from "./routes/CategoryRoutes.js";
import productroute from "./routes/ProductRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";



// import mongoose from "mongoose";



//configure dotenv

dotenv.config();

//database connectivity

dbconnect();



// create app for server
const app = Express();

//middleware
app.use(cors());
app.use(Express.json());
app.use(morgan());
app.use(morgan("combined"));


//rotes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/category", categoryroute);
app.use("/api/v1/product", productroute);



//middleware
// app.use(cors());
app.use(Express.json());
app.use(morgan());
app.use(morgan("combined"));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(Express.static(path.resolve(__dirname, process.env.BUILD)));
// app.use(express.static(path.resolve(__dirname, process.env.BUILD)));
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});



// //rotes
// app.use("/api/v1/auth", authroute);
// app.use("/api/v1/category", categoryroute);
// app.use("/api/v1/product", productroute);


//rest api

// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to e-commerce App</h1>");
// })

// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/e-commerce/build/index.html"));
// })





// // Set the root directory for serving files
// app.use(Express.static(process.env.BUILD));

// app.use('*', function(req, res){
//   // Specify a relative path to the file
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });




//listen app

// const PORT = process.env.PORT || 8080;
const PORT = 8080; 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`.bgBlack.blue.bold);
})