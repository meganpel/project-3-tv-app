import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, Button } from "../../components/Form";


class TV extends Component {
  state = {
    shows: [],
    searchResults: [],
    term: "",
  };

  componentDidMount() {
    this.showCollect();
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      API.Find(this.state.term)
      .then(res =>
        {this.setState({
          searchResults: res.data.results[0],
          term: ""
        });
    
        }
      )
      .catch(err => console.log(err));
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
       {this.state.searchResults.name}
       </strong>
       <br/>
       <img src={this.state.searchResults.picture} width='200' height='100'/>
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
  