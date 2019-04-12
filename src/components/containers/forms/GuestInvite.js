import React, { useState } from "react";
import GuestInvite from "../../presentational/forms/GuestInvite";
import { api } from "../../../utils";
export default function GuestInviteContainer() {
	const [email, setEmail] = useState("");

	return (
		<GuestInvite
			value={email}
			onChange={e => setEmail(e.target.value)}
			onSubmit={() => {
				api.inviteGuest({
					email,
					url: `${process.env.REACT_APP_CAR_BOOKING_API_DOMAIN}/signup`
				});
			}}
		/>
	);
}
