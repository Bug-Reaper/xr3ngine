import React from "react";
import PropTypes from "prop-types";
import { ContextMenuTrigger } from "../layout/ContextMenu";

/**
 * 
 * @author Robert Long
 * @param {any} className 
 * @param {any} attributes 
 * @param {any} children 
 * @param {any} rest 
 * @returns 
 */
export default function StylableContextMenuTrigger({ className, attributes, children, ...rest }) {
  return (
    /* @ts-ignore */
    <ContextMenuTrigger {...rest} attributes={{ className, ...attributes }}>
      {children}
    </ContextMenuTrigger>
  );
}

StylableContextMenuTrigger.propTypes = {
  className: PropTypes.string,
  attributes: PropTypes.object,
  children: PropTypes.node
};
