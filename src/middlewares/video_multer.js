import multer, { diskStorage } from "multer";
import { extname } from "path";

const VideoUploader = multer({
  storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".avi" && ext !== ".mov") {
      cb(new Error("Only .mp4, .avi, and .mov files are supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default VideoUploader;
