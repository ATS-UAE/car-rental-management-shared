import { useEffect, useState, cloneElement } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import RBAC from "../../../utils/rbac";

function Can({
	auth,
	role,
	action,
	resource,
	params,
	yes,
	no,
	whatever,
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
			let $role = role || auth.data.role;
			RBAC.can($role, action, resource, params).then(access =>
				setAccess({
					access,
					excludedFields: RBAC.getExcludedFields($role, action, resource),
					params,
					resource,
					action,
					role: $role,
					auth
				})
			);
		}
	}, [auth, role, action, resource, params]);
	if (access !== null) {
		let components = [];
		if (whatever !== undefined) {
			let child = whatever(access);
			if (child) components.push(cloneElement(child, { key: "whatever" }));
		}
		if (access.access && yes !== undefined) {
			let child = yes(access);
			if (child) components.push(cloneElement(child, { key: "yes" }));
		} else if (no !== undefined) {
			let child = no(access);
			if (child) components.push(cloneElement(child, { key: "no" }));
		}
		return components;
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
	whatever: PropTypes.func,
	loading: PropTypes.node
};

Can.defaultProps = {
	params: {}
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(Can);