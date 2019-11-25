import * as S from "sequelize";
import { Client } from "./";

export interface CategoryAttributes {
	id: number;
	name: string;
	clientId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Category extends S.Model implements CategoryAttributes {
	public id: number;
	public name: string;
	public clientId: number;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public readonly client?: Client;

	public static associations: {
		client: S.Association<Category, Client>;
	};

	static load = (sequelize: S.Sequelize) => {
		Category.init(
			{
				name: { type: S.DataTypes.STRING, allowNull: false, unique: true }
			},
			{
				sequelize,
				validate: {
					clientRequired() {
						if (!this.clientId) {
							throw new Error(
								"Please specify which client this category belongs to."
							);
						}
					}
				}
			}
		);
		Category.belongsTo(Client, {
			foreignKey: {
				name: "clientId",
				allowNull: false
			},
			as: "client"
		});
	};
}
