import React from "react";
import './SimButton.css';


const SimButton = props => (


    <button className="similar" type="button" onClick={props.handleBtnClick} {...props}>
        Find Similar Programs
  </button>

)

export default SimButton;