import React, { FC } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

export interface VehicleIssueListProps {
	items: string[];
}

export const VehicleIssueList: FC<VehicleIssueListProps> = ({ items }) => {
	return (
		<List>
			{items.map(item => (
				<ListItem>
					<ListItemText primary={item}></ListItemText>
				</ListItem>
			))}
		</List>
	);
};
