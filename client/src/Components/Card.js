import React from "react";

const Card = props => (
  <div className="card text-center">
    <div className="card-header">
      <h2>First, tell us a program you like.</h2>
      <h4>We'll search and make sure we have the right one....</h4>
    </div>
    <div className="card-body">{props.children}</div>
  </div>
);

export default Card;
