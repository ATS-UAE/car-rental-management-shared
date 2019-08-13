import fs from "fs";
import { deleteFileFromUrl } from "../utils/helpers";

type fileURI = { url: string; path: string };

export default async (
	{ file, files }: { file?: fileURI; files?: { [key: string]: fileURI } },
	res,
	next
) => {
	if (res.statusCode >= 400) {
		if (file) {
			if (file.url) deleteFileFromUrl(file.url);
			else if (file.path) fs.promises.unlink(file.path);
		}
		if (files) {
			for (const key in Object.keys(files)) {
				const file = files[key];
				if (file.url) deleteFileFromUrl(file.url);
				else if (file.path) fs.promises.unlink(file.path);
			}
		}
	}
	next();
};
