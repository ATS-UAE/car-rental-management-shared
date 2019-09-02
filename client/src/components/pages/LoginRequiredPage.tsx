import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Loading from "../presentational/layout/Loading";

const LoginRequiredPage: FC<any> = ({ auth, children }) => {
	if (auth === null) {
		return <Loading />;
	}
	return auth === false ? <Redirect to="/login" /> : children;
};

const mapStateToProps = ({ auth }: any) => ({
	auth
});

export default compose(connect(mapStateToProps))(LoginRequiredPage);
