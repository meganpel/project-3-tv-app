import React from "react";


const SimButton = props => (


    <button className="btn btn-info" type="submit" onClick={props.handleBtnClick} {...props}>
        Find Similar Programs
  </button>

)


export default SimButton;