const { deleteFileFromUrl } = require("../utils");

const addReplacedFiles = (res, { url, model, field }) => {
	res.locals.replacedFiles
		? res.locals.replacedFiles.push({ url, model, field })
		: (res.locals.replacedFiles = [{ url, model, field }]);
};

const deleteReplacedFiles = async (req, { locals }, next) => {
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

module.exports = { addReplacedFiles, deleteReplacedFiles };
