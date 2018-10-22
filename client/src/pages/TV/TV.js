import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ResultList from "../../Components/ResultList"
import { Col, Row, Container } from "../../Components/Grid";
import { List, ListItem } from "../../Components/List";
import { Input, TextArea, Button } from "../../Components/Form";
import SimButton from "../../Components/SimButton";

class TV extends Component {
  state = {
    shows: [],
    searchResults: [],
    results: [],
    simResults: [],
    term: "",
  };

  componentDidMount() {
    this.showCollect();
  }
  handleBtnClick = event => {
    const value = event.target.value;
    this.searchSimilar(value);
  }


  showCollect = () => {
    API.UserData()
      .then(res =>
        this.setState({ shows: res.data })
      )
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchSimilar = (value) => {
    API.similar(value)
      .then(res => {
        var answer = res;
        this.setState({
          simResults: answer.data.results
        });
        console.log(this.state);
      }).catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      API.Find(this.state.term)
      .then(res =>
        {this.setState({
          searchResults: res.data.results,
          term: ""
        });
    
        }
      )
      .catch(err => console.log(err));
  
      API.search(this.state.term)
      .then(res =>
        {this.setState({
          results: res.data.results,
          term: ""
        });
      }
    )
  }
};



  render() {
    return (
      <Container d-flex justify-content-center>
      
      <Col size="col-centered">
          
            <form>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Term (required)"
              />
      
              <Button
                disabled={!(this.state.term)}
                onClick={this.handleFormSubmit}
              >
                Search 
              </Button>
            </form></Col>
     <br/>
     <strong>
          {this.state.searchResults.map(shows=>(
              <div>
                    {shows.name}
                  <img src={shows.picture} width='200' height='100'/>

              {shows.locations.map(showLocation=>(
                     <div>
                     {showLocation.display_name}
                    </div> 
             ))} 
                      </div>
                      
            ))
            
            
            }   </strong>

         
           
       {/* {this.state.searchResults.name}
    
       <br/>
       <img src={this.state.searchResults.picture} width='200' height='100'/> */}

<ResultList>
       {this.state.results.map(result => (

<div className="container">
  <ul className="list-group">
    <li>Name: {result.name}</li>
    <li>Poster Link: {result.poster_path}</li>
    <li> Key: {result.id}</li>
    <li>overview: {result.overview}</li>
    <SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton>
  </ul>
  <br/>
</div>

))}
</ResultList>

 <Col size="md-4">
            <ResultList>
              <div className="col-md">
                {this.state.simResults.map(result2 => (

                  <div className="container"
                  
                   >
                    <ul className="list-group">
                      <li>Name: {result2.name} key= {result2.id}</li>
                      <li><img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result2.poster_path}`}  width='200' height='100'/> </li>
                      <li> Key: {result2.id}</li>
                      <li>overview: {result2.overview}</li>

                    </ul>
                  </div>
                ))}

              </div>
            </ResultList>

          </Col>
     {/* <Col size="col-centered">
           
          {this.state.searchResults.length ? (
          <List>
                {this.state.searchResults.map(tv => (
                  <ListItem key={tv._id}>
                       <strong> {tv.name}</strong>
       
                       
     

                  </ListItem>
                ))}
              </List>
            ) : (
<h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="col-centered">

            ) : (
<h3>No Results to Display</h3>
            )}
            </Col> */}
      </Container>
    );
  }
}
export default TV;
  