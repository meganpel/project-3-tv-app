import React from "react";


const ResultList = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">
          {children}
      </div>
    </div>
  );
}
export default ResultList;