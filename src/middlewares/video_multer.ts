import multer, { diskStorage } from "multer";
import { extname } from "path";
import { Request } from "express";

const VideoUploader = multer({
  storage: diskStorage({}),
  fileFilter: (req: Request, file, cb) => {
    let ext: string = extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".avi" && ext !== ".mov") {

      return "Unsupported file format";
    }
    cb(null, true);
  },
});

export default VideoUploader;
