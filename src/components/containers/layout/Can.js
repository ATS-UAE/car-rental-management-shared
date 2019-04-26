import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { api } from "../../../utils";

function Can({
	auth,
	role,
	action,
	resource,
	params,
	yes,
	no,
	loading,
	fetchCurrentUserDetails
}) {
	let [access, setAccess] = useState(null);
	useEffect(() => {
		if (auth === null) {
			fetchCurrentUserDetails();
		}
	}, []);
	useEffect(() => {
		if (auth) {
			api
				.checkAccess({
					role: role || auth.data.role.name,
					action,
					resource,
					params
				})
				.then(res => setAccess(res.data));
		}
	}, [auth]);
	if (access !== null) {
		if (access.access && yes !== undefined) return yes(access) || null;
		else if (no !== undefined) return no(access) || null;
	}
	return loading || null;
}

Can.propTypes = {
	role: PropTypes.string,
	action: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
	params: PropTypes.object,
	yes: PropTypes.func,
	no: PropTypes.func,
	loading: PropTypes.node
};

Can.defaultProps = {
	params: {}
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
	mapStateToProps,
	actions
)(Can);
