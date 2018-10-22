import React from "react";
import SimButton from "SimButton2"

const Results = props => (

    <div className="container">
        <ul className="list-group">
            <li>Name: {props.name}</li>
            <li><a href ={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${props.poster_path}`}>Poster Link:</a></li>
            <li>overview: {props.overview}</li>
            <SimButton value ={props.id}
            onClick={props.handleBtnClick}
            >Find Similar Movies</SimButton>
        </ul>
    </div>
);

export default Results;