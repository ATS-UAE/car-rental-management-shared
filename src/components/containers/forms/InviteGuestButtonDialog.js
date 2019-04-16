import React, { useState } from "react";
import { api } from "../../../utils";
import DialogButton from "../../presentational/forms/DialogButton";
import GuestInvite from "../../presentational/forms/GuestInvite";

function InviteGuestButtonDialog() {
	const [email, setEmail] = useState("");
	let [open, setOpen] = useState(false);
	return (
		<DialogButton
			open={open}
			onClick={() => setOpen(true)}
			onClose={() => setOpen(false)}
			buttonText="Invite Customer"
		>
			<GuestInvite
				value={email}
				onChange={e => setEmail(e.target.value)}
				title="Invite Customer"
				onSubmit={() => {
					api
						.inviteGuest({
							email,
							url: `${process.env.REACT_APP_CAR_BOOKING_CLIENT_DOMAIN}/signup`
						})
						.then(() => setOpen(false));
				}}
			/>
		</DialogButton>
	);
}

export default InviteGuestButtonDialog;
