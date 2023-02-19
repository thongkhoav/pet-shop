import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import crypto from 'crypto'
import path from 'path'
import dotenv from "dotenv";
dotenv.config();
const DB_URL =  process.env.MONGO_URL;

const storage = new GridFsStorage({
    url: DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                };
                resolve(fileInfo);
            });
        });
    }
})

export default multer({ storage }); 