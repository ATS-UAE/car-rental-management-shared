import React from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EmailField from "../inputs/EmailField";

function GuestInvite({ value, onChange, onSubmit, classes }) {
	return (
		<Paper className={classes.paper}>
			<form>
				<Grid container spacing={24} alignItems="center">
					<Grid item className={classes.emailField}>
						<EmailField
							TextFieldProps={{
								fullWidth: true
							}}
							value={value}
							onChange={onChange}
						/>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							onClick={e => {
								e.preventDefault();
								onSubmit(e);
							}}
						>
							Invite
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	},
	emailField: {
		flexGrow: 1
	}
});

export default withStyles(style)(GuestInvite);
