import { Category as CategoryModel, User } from "../models";
import { Role } from "../variables/enums";
export class Category {
	private constructor(public data: CategoryModel) {}

	public static getAll = async (user: User) => {
		let categories: CategoryModel[] = [];
		if (user.role === Role.MASTER) {
			// Return all Categories
			categories = await CategoryModel.findAll();
		} else if (user.clientId) {
			// Return all Categories from client
			categories = await CategoryModel.findAll({
				where: {
					clientId: user.clientId
				}
			});
		}

		return categories.map(c => new Category(c));
	};

	public static create;
}
