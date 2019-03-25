import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import UserUpdateTable from "../../presentational/forms/UserUpdateTable";

function UserUpdateTableContainer({ updateUser }) {
	return <UserUpdateTable onSubmit={() => {}} />;
}

export default connect(
	null,
	actions
)(UserUpdateTableContainer);
