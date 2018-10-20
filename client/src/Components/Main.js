import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
// import Results from "./Results";
// import ResultList from "./ResultList"
import SearchForm from "./SearchForm";

import API from "../utils/API";

class Main extends Component {
  state = {
    results: [],
    search: "",

  };

  componentDidMount() {
    this.searchSimilar();
  }

  searchSimilar = () => {
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
  }; ß

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.searchSimilar(this.state.search);
  }


  render() {
    return (

      <Container>
        <Row>
          {/* <div>
            <ResultList> */}
              {this.state.results.map(result => (

                <div className="container">
                  <ul className="list-group">
                    <li>Name: {result.name}</li>
                    <li>Poster Link: {result.poster_path}</li>
                    <li> Key: {result.id}</li>
                    <li>overview: {result.overview}</li>
                  </ul>
                </div>

              ))}
            {/* </ResultList>

          </div> */}

          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;

