import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
// import Results from "./Results";
import ResultList from "./ResultList";
import SearchForm from "./SearchForm";
import SimButton from "./SimButton2";

import API from "../utils/API";

class Main extends Component {
  state = {
    results: [],
    results2: [],
    search: "",

  };

  componentDidMount() {
    this.searchName();
  }

  searchName = () => {
    const search = this.state.search
    API.search(search)
      .then(res => {
        var answer = res;
        this.setState({
          results: answer.data.results
        });
        console.log(this.state);
      }).catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.searchName(this.state.search);
  }

  handleBtnClick = event => {
    const value = event.target.value;
    this.searchSimilar(value);
  }

  searchSimilar = (value) => {
    API.similar(value)
      .then(res => {
        var answer = res;
        this.setState({
          results2: answer.data.results
        });
        console.log(this.state);
      }).catch(err => console.log(err));
  };

  render() {
    return (

      <Container>
        <Row>
          <Col size="md-4">
            <Card heading="Tell us your favorite show">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="col-md">
            <ResultList>
              {this.state.results.map(result => (

                <div className="container"  key={result.id} >
                  <ul className="list-group">
                    <li>Name: {result.name}</li>
                    <li><a href={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`} target="_blank" rel="noopener noreferrer" >Poster Link: Click Here</a></li>
                    <li> Key: {result.id}</li>
                    <li>overview: {result.overview}</li>
                    <SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton>
                  </ul>
                </div>
              ))}
            </ResultList>
          </div>


          <Col size="md-4">
            <ResultList>
              <div className="col-md">
                {this.state.results2.map(result2 => (

                  <div className="container"
                  
                   >
                    <ul className="list-group">
                      <li>Name: {result2.name} key= {result2.id}</li>
                      <li><a href={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result2.poster_path}`} target="_blank" rel="noopener noreferrer">Poster Link: Click Here</a></li>
                      <li> Key: {result2.id}</li>
                      <li>overview: {result2.overview}</li>

                    </ul>
                  </div>
                ))}

              </div>
            </ResultList>

          </Col>
        </Row>

      </Container>
    );
  }
}

export default Main;

