import React from "react";
import "./Dropdown.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Dropdown = props => (
  <span type ="button" className="btn btn-primary delete-btn" {...props}>
    ✗
  </span>
);

export default Dropdown;
