import React from "react";
// import API from "../utils/API";


const SimButton = props => (


    <button className="btn btn-info" type="submit" onClick={props.handleBtnClick} {...props}>
        Find Similar Programs
  </button>

)
//    handleBtnClick = event => {
//     const value = event.target;
//     API.similar(value)
//     .then(res => {
//         console.log(res);
//     }).catch(err => console.log(err));
// }


export default SimButton;