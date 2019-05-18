import React, { useState } from "react";
import { connect } from "react-redux";
import UserFormCreate from "./UserFormCreate";
import DialogButton from "../../../presentational/forms/DialogButton";
import { roles } from "../../../../variables/enums";

function UserFormCreateButtonDialog({ auth }) {
	let [open, setOpen] = useState(false);
	return auth && auth.data && auth.data.role.name === roles.ADMIN ? (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<UserFormCreate
				onSubmit={() => setOpen(false)}
				ticksMap={{
					xs: 3,
					sm: 4,
					md: 4,
					lg: 4,
					xl: 4
				}}
			/>
		</DialogButton>
	) : null;
}

const mapStateToProps = ({ auth }) => ({
	auth
});

export default connect(mapStateToProps)(UserFormCreateButtonDialog);
