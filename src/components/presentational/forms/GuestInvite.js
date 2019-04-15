import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EmailField from "../inputs/EmailField";

function GuestInvite({ value, onChange, onSubmit, classes, title }) {
	return (
		<form>
			{title && (
				<Typography variant="h6" gutterBottom headlineMapping={{ h6: "h1" }}>
					{title}
				</Typography>
			)}
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
	);
}

GuestInvite.propTypes = {
	title: PropTypes.string
};

const style = theme => ({
	emailField: {
		flexGrow: 1
	}
});

export default withStyles(style)(GuestInvite);
