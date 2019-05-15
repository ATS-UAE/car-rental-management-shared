import React, { useState } from "react";
import BookingFormCreate from "./BookingFormCreate";
import DialogButton from "../../../presentational/forms/DialogButton";
import Can from "../../layout/Can";
import { resources, actions } from "../../../../variables/enums";

export default function BookingCreateButtonDialog() {
	let [open, setOpen] = useState(false);

	return (
		<Can
			action={actions.CREATE}
			resource={resources.BOOKINGS}
			yes={access => (
				<DialogButton
					open={open}
					onClick={() => setOpen(true)}
					onClose={() => setOpen(false)}
				>
					<BookingFormCreate
						exclude={access.excludedFields}
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
			)}
		/>
	);
}
