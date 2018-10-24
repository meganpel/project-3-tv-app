import React from "react";
import './ResultList.css';

const ResultList = ({ children }) => {
  return (
    <div className="card">
      <div className="card-body">
      <span>
          {children}
          </span>
      </div>
    </div>
  );
}
export default ResultList;