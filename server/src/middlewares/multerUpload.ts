import path from "path";
import multer from "multer";
import { getStaticFilesPath, makeDirectoryIfNotExist } from "../utils/helpers";

const upload = (uploadPath, options?) => {
	return multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				const filePath = path.join(getStaticFilesPath(), uploadPath);
				makeDirectoryIfNotExist(filePath)
					.then(() => cb(null, filePath))
					.catch(e => cb(e, filePath));
			},
			filename: function(req, file, cb) {
				console.log(file);
				cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
			}
		}),
		limits: {
			fileSize: 10000000,
			...(options && options.limits)
		}
	});
};
export default upload;
