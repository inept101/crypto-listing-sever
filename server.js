import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });


import express from 'express';
import mongoose from 'mongoose';


import appRoutes from './routes/cryptos.js';



const app = express();


app.use(express.json());

const PORT=process.env.PORT||8000;


mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("DB NOT CONNECTED");
        console.log(err)
    })

app.get('/', (req,res)=>{
    res.send("Api Backend");
})


app.use(appRoutes);

app.listen(PORT,()=>{
    console.log("server in running on port 8000");
})
