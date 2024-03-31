import multer, { diskStorage } from "multer";
import { extname } from "path";

const ImageUploader = multer({
  storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("The file type isn't supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default ImageUploader;