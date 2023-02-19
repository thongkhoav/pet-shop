import mongoose from "mongoose"
import fs from 'fs';
let gfs;
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.MONGO_URL;
const connection = mongoose.createConnection(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "photos"
    })
});

export const getImageController = async (req, res) => {
    const filename = req.params.filename;
    return (
        await gfs.find({
            filename: filename
        }).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            gfs.openDownloadStreamByName(filename).pipe(res);
        })
    )
}

export const deleteImageById = (fileId) => {
    try {
        gfs.delete(new mongoose.Types.ObjectId(fileId), (err, data) => {
        });
    } catch (error) {
        console.log(error);
    }
}

