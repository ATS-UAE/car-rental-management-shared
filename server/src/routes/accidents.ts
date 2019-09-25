import express from "express";

import requireLogin from "../middlewares/requireLogin";
import {
	deleteReplacedFiles,
	addReplacedFiles
} from "../middlewares/deleteReplacedFiles";
import parseBody from "../middlewares/parseBody";
import upload from "../middlewares/multerUpload";
import deleteFileOnError from "../middlewares/deleteFileOnError";
import db from "../models";
import { ResponseBuilder, getFileURL } from "../utils/helpers/";
import { Accident } from "../datasource";

const router = express.Router();
router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	const response = new ResponseBuilder();
	const AccidentDataSource = new Accident(db, user);

	try {
		const accidents = await AccidentDataSource.getAll();
		response.setData(accidents);
		response.handleSuccess(`Found ${accidents.length} accidents.`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/accidents").fields([
		{ name: "accidentImageSrc" },
		{ name: "accidentVideoSrc" }
	]),
	parseBody,
	async ({ user, body, files }, res, next) => {
		const response = new ResponseBuilder();
		const AccidentDataSource = new Accident(db, user);
		const accidentImageSrc =
			files &&
			files.accidentImageSrc &&
			files.accidentImageSrc[0] &&
			files.accidentImageSrc[0].filename &&
			getFileURL(
				"carbooking/media/accidents",
				files.accidentImageSrc[0].filename
			);
		const accidentVideoSrc =
			files &&
			files.accidentVideoSrc &&
			files.accidentVideoSrc[0] &&
			files.accidentVideoSrc[0].filename &&
			getFileURL(
				"carbooking/media/accidents",
				files.accidentVideoSrc[0].filename
			);

		try {
			const createdAccident = await AccidentDataSource.create({
				...body,
				accidentImageSrc,
				accidentVideoSrc
			});

			response.setData(createdAccident);
			response.handleSuccess("Accident has been created.", res);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
		next();
	},
	deleteFileOnError
);

router.get("/:id", async ({ user, params }, res) => {
	const response = new ResponseBuilder();
	const AccidentDataSource = new Accident(db, user);

	try {
		const foundAccident = await AccidentDataSource.get(params.id);
		response.setData(foundAccident.get({ plain: true }));
		response.handleSuccess(`Found accident with ID ${params.id}`, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch(
	"/:id",
	upload("carbooking/media/accidents").fields([
		{ name: "accidentImageSrc" },
		{ name: "accidentVideoSrc" }
	]),
	parseBody,
	async ({ user, params, body, files }, res, next) => {
		const response = new ResponseBuilder();
		const AccidentDataSource = new Accident(db, user);

		try {
			const accidentImageSrc =
				files &&
				files.accidentImageSrc &&
				files.accidentImageSrc[0] &&
				files.accidentImageSrc[0].filename &&
				getFileURL(
					"carbooking/media/accidents",
					files.accidentVideoSrc[0].filename
				);
			const accidentVideoSrc =
				files &&
				files.accidentVideoSrc &&
				files.accidentVideoSrc[0] &&
				files.accidentVideoSrc[0].filename &&
				getFileURL(
					"carbooking/media/accidents",
					files.accidentVideoSrc[0].filename
				);
			const [previousValue, updatedAccident] = await AccidentDataSource.update(
				params.id,
				{
					...body,
					accidentImageSrc,
					accidentVideoSrc
				}
			);
			accidentImageSrc &&
				addReplacedFiles(res, {
					url: previousValue.accidentImageSrc,
					model: db.Accident,
					field: "accidentImageSrc"
				});
			accidentVideoSrc &&
				addReplacedFiles(res, {
					url: previousValue.accidentVideoSrc,
					model: db.Accident,
					field: "accidentVideoSrc"
				});
			response.setData(updatedAccident);
			response.handleSuccess(
				`Accident with ID ${params.id} has been updated.`,
				res
			);
		} catch (e) {
			response.handleError(e, res);
		}
		res.json(response);
		next();
	},
	deleteFileOnError,
	deleteReplacedFiles
);

router.delete("/:id", async ({ user, params }, res, next) => {
	const response = new ResponseBuilder();
	const AccidentDataSource = new Accident(db, user);
	try {
		await AccidentDataSource.delete(params.id);
		response.handleSuccess(
			`Accident with ID ${params.id} has been deleted.`,
			res
		);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
	next();
});

export default router;
