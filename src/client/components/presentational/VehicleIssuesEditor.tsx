import React, { FC, Fragment } from "react";
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	TextField
} from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";

type Issue = { id: number; message: string };

export interface VehicleIssuesEditorProps {
	values: Array<Issue>;
	newValue: string;
	onAdd: (value: string) => void;
	onDelete: (value: Issue) => void;
	onChange: (value: string) => void;
}

export const VehicleIssuesEditor: FC<VehicleIssuesEditorProps> = ({
	onDelete,
	onAdd,
	newValue,
	values,
	onChange
}) => {
	const handleDelete = (id: number) => () => {
		const found = values.find(value => value.id === id);
		found && onDelete(found);
	};
	return (
		<Fragment>
			<TextField
				id="issue"
				label="Add new issue."
				margin="normal"
				value={newValue}
				onChange={e => onChange && onChange(e.target.value)}
			/>
			<IconButton
				edge="end"
				aria-label="delete"
				onClick={() => {
					onAdd(newValue);
				}}
			>
				<Add />
			</IconButton>
			<List>
				{values.map(issue => (
					<ListItem>
						<ListItemText primary={issue.message} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={handleDelete(issue.id)}
							>
								<Delete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Fragment>
	);
};
