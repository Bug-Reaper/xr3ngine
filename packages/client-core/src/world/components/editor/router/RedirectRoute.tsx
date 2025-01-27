import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

/**
 * 
 * @author Robert Long
 * @param {any} to 
 * @param {any} rest
 * @returns 
 */
export default function RedirectRoute({ to, ...rest }) {
  return <Route {...rest} render={() => <Redirect to={to} />} />;
}

RedirectRoute.propTypes = {
  to: PropTypes.any
};
