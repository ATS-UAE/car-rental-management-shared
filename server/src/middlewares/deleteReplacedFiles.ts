import { deleteFileFromUrl } from "../utils/helpers";
import { ModelType } from "sequelize";

type ReplaceFileURI = {
	url: string;
	model: ModelType;
	field: string;
};

export const addReplacedFiles = (
	res: { [key: string]: any; locals: any },
	{ url, model, field }: ReplaceFileURI
) => {
	res.locals.replacedFiles
		? res.locals.replacedFiles.push({ url, model, field })
		: (res.locals.replacedFiles = [{ url, model, field }]);
};

export const deleteReplacedFiles = async (
	req,
	{ locals }: { locals: any; [key: string]: any },
	next
) => {
	if (locals.replacedFiles) {
		for (let file of locals.replacedFiles) {
			if (file.url && file.model && file.field) {
				file.model
					.findAll({
						where: {
							[file.field]: file.url
						}
					})
					.then(found => {
						if (!found.length) {
							deleteFileFromUrl(file.url);
						}
					});
			}
		}
	}

	next();
};

export default deleteReplacedFiles;
