import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import ResultList from "./ResultList";
import API from "../utils/API";

class Today extends Component {
    state = {
        programs: []
    };

    componentDidMount() {
        // this.getToday();
    }

    getToday = () => {
        API.getToday()
            .then(res => {
                var answer = res;
                this.setState({
                    programs: answer.data.results
                });
                console.log(this.state);
            }).catch(err => console.log(err));
    };


    handleBtnClick = event => {
        console.log(event)
        this.getToday();
    }


    render() {
        return (

            <Container>
                <div className="card text-center">
                    <div className="card-header">
                        <h2>Get a list of all programs airing today!</h2>
                    </div>
                        <div className="card-body">
                            <button
                            onClick={this.handleBtnClick}
                            className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            <Row>
                    <div className="col-md">
                        <ResultList>
                            {this.state.programs.map(program => (
                                <div className="container"  key={program.id}>
                                    <ul className="list-group">
                                        <li>Name: {program.name}</li>
                                        <li><a href={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${program.poster_path}`} target="_blank" rel="noopener noreferrer" >Poster Link: Click Here</a></li>
                                        <li> Key: {program.id}</li>
                                        <li>overview: {program.overview}</li>
                                        {/* <SaveButton value={result.id} name="id" onClick={this.saveClick}>Add to Your Watch List</SaveButton> */}
                                    </ul>
                                </div>
                            ))}
                        </ResultList>
                    </div>

                </Row>

            </Container>
        );
    }
}

export default Today;

