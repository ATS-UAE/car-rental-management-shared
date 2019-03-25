import React from "react";
import { Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EmailField from "../inputs/EmailField";

function GuestInvite({ value, onChange, onSubmit }) {
	return (
		<Paper>
			<form>
				<EmailField value={value} onChange={onChange} />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					onClick={onSubmit}
				>
					Invite
				</Button>
			</form>
		</Paper>
	);
}

const style = theme => ({
	paper: {
		padding: theme.spacing.unit * 3
	}
});

export default withStyles(style)(GuestInvite);
