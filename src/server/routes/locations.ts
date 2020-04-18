import express from "express";
import requireLogin from "../middlewares/requireLogin";
import disallowGuests from "../middlewares/disallowGuests";
import parseBody from "../middlewares/parseBody";
import deleteFileOnError from "../middlewares/deleteFileOnError";
import {
	deleteReplacedFiles,
	addReplacedFiles
} from "../middlewares/deleteReplacedFiles";
import upload from "../middlewares/multerUpload";
import db from "../models";
import { getFileURL, ResponseBuilder } from "../utils";
import { Location } from "../datasource";

const router = express.Router();
router.use(requireLogin);

router.get("/", async ({ user }: any, res) => {
	const response = new ResponseBuilder();
	const LocationDataSource = new Location(db, user);

	try {
		const locations = await LocationDataSource.getAll();
		response.setData(locations);
		response.handleSuccess(`Found ${locations.length} locations. `, res);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/locations").single("locationImageSrc"),
	parseBody,
	disallowGuests,
	async ({ user, body }, res) => {
		const response = new ResponseBuilder();
		const LocationDataSource = new Location(db, user);

		try {
			const createdLocation = await LocationDataSource.create(body);
			response.setData(createdLocation);
			response.handleSuccess("Location has been created.", res);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
	},
	deleteFileOnError
);

router.get("/:id", async ({ user, params }: any, res) => {
	const response = new ResponseBuilder();
	const LocationDataSource = new Location(db, user);

	try {
		let foundLocation = await LocationDataSource.get(params.id);

		response.setData(foundLocation.get({ plain: true }));
		response.handleSuccess(
			`Found location with ID of ${foundLocation.id}`,
			res
		);
	} catch (e) {
		response.handleError(e, res);
	}

	res.json(response);
});

router.patch(
	"/:id",
	upload("carbooking/media/locations").single("locationImageSrc"),
	parseBody,
	disallowGuests,
	async ({ user, params, body, file = {} }, res) => {
		const fileLocation =
			file &&
			file.filename &&
			getFileURL("carbooking/media/users/profile", file.filename);
		const response = new ResponseBuilder();
		const LocationDataSource = new Location(db, user);

		try {
			const updatedLocation = await LocationDataSource.update(params.id, body);
			fileLocation &&
				addReplacedFiles(res, {
					url: updatedLocation.locationImageSrc,
					model: db.Location,
					field: "locationImageSrc"
				});

			response.setData(updatedLocation.get({ plain: true }));
			response.handleSuccess(`Location with ID ${params.id} updated.`, res);
		} catch (e) {
			response.handleError(e, res);
		}

		res.json(response);
	},

	deleteFileOnError,
	deleteReplacedFiles
);

router.delete("/:id", async ({ user, params }: any, res) => {
	let response = new ResponseBuilder();
	const LocationDataSource = new Location(db, user);
	try {
		let deletedLocation = await LocationDataSource.delete(params.id);
		response.setData(deletedLocation.get({ plain: true }));
		response.handleSuccess(
			`Location with ID ${params.id} has been deleted.`,
			res
		);
	} catch (e) {
		response.handleError(e, res);
	}
	res.json(response);
});

export default router;
