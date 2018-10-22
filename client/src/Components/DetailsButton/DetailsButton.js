import React from "react";


const DetailsButton = props => (


    <button className="btn btn-info" type="submit" onClick={props.handleBtnClick} {...props}>
        Further Details
  </button>

)


export default DetailsButton;