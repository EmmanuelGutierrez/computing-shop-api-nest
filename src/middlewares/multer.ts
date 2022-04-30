import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const multerConfig: multer.DiskStorageOptions = {
  destination: "uploads",
  filename(req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  },
};

const storage = multer.diskStorage(multerConfig);

export default multer({ storage });
