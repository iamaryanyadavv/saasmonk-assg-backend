import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import client from './db.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors()); // Enable CORS for all routes

app.post('/movies', async (req, res) => {
    console.log("Adding Movie")
  try {
    const collection = client.db("SaasMonk_Movies").collection("Movies");
    const post = {
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        totalStars: 0,
        totalReviews: 0
    };

    await collection.insertOne(post);
    return res.json("Movie has been created.");
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
});

app.get('/movies', async (req, res) => {
    try {
        const cat = req.query.cat;
        const collection = client.db("SaasMonk_Movies").collection("Movies");
        const query = cat ? { cat } : {};
        
            const data = await collection.find(query).toArray();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error executing query:", error);
            return res.status(500).json(error);
        }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
