import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	}
}));

function InteractiveList({ list, title }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h6" className={classes.title}>
				{title}
			</Typography>
			<div className={classes.demo}>
				<List dense>
					{list.map(item => (
						<ListItem>
							<ListItemText
								primary={item.primary}
								secondary={item.secondary ? "Secondary text" : null}
							/>
						</ListItem>
					))}
				</List>
			</div>
		</div>
	);
}

export default InteractiveList;
