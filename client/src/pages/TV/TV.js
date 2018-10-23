import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ResultList from "../../Components/ResultList"
import { Col, Row, Container } from "../../Components/Grid";
import { List, ListItem } from "../../Components/List";
import { Input, TextArea, Button } from "../../Components/Form";
import SimButton from "../../Components/SimButton";
import DetailsButton from "../../Components/DetailsButton";
import '../../Components/ResultList/ResultList.css';
import Fade from 'react-reveal/Fade';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



class TV extends Component {
  state = {
    shows: [],
    searchResults: [],
    results: [],
    simResults: [],
    details: [],
    term: "",
    today: []

    
  };
  

  componentDidMount() {
    this.showCollect();
  }
  handleBtnClick = event => {
    const value = event.target.value;
    this.searchSimilar(value);
  }

  handleBtnClick2 = event => {
    const value = event.target.value;
    this.details(value);
  }
  handleBtnClick3 = event => {
    const value = event.target.value;
    this.search(value);
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
          simResults: answer.data.results,
          term: "",
        });
        console.log(this.state);
      }).catch(err => console.log(err));
  };

  search= (value) => {
    API.search(value)
      .then(res => {
        this.setState({
          results: res.data.results,
          term: ""
        });
        console.log(this.state);
      }).catch(err => console.log(err));
  };

  details = (value) => {
    API.details(value)
      .then(res => {
        var answer = res;
        this.setState({
          details: answer.data,
          searchResults: [],
          term: "",
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
          simResults:[],
          shows: [],
          results: [],
          today: [],
          details: [],
          term: ""
        });
    
        }
      )
      .catch(err => console.log(err));
  
      // API.search(this.state.term)
      // .then(res =>
      //   {this.setState({
      //     results: res.data.results,
      //     term: ""

      //   });
      // }
    // )
  }
};
handleFormSubmit2 = event => {
  event.preventDefault();
  
    API.getToday()
    .then(res =>
      {this.setState({
        today: res.data.results,
        shows: [],
    searchResults: [],
    results: [],
    simResults: [],
    details: [],
  
        term:""
      });
  
      }
    )
    .catch(err => console.log(err));

};


  render() {
    return (
      <Container d-flex justify-content-center>
      <br/>
      {/* <Col size="col-centered"> */}
      <div class="row">
      <div class="col-sm-8">
      Search:
      </div>
      <div class="col-sm-4">

      <Tabs>
    <TabList>
         <Tab> test  </Tab> 
         <Tab> test2  </Tab> </TabList>
         <TabPanel>
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
            </form>
            </TabPanel>
            <TabPanel> Find what's on TV Today <br/>
            <Button
                onClick={this.handleFormSubmit2}
              >
                Search 
              </Button>
               </TabPanel>  </Tabs>
            </div>
            </div>
            {/* </Col> */}
     <br/>
   
    
     <strong>  
       
         <Fade top><h1> Did you mean...</h1> </Fade>
          {this.state.searchResults.map(shows=>(
     <ResultList>                        

       {/* <div className="dataDiv"style={{backgroundImage: `url(${shows.picture})`} } > */}
<div>
            <Fade top>
            
            <table class="table">
            <tbody>    <tr>
      <th scope="col"><img className="contain" src={shows.picture} /></th>
      <th scope="col"> {shows.name}<br/> Available on: 
      {shows.locations.map(showLocation=>(
<div>
              
                    
 <a href={showLocation.url}><img src={showLocation.icon}/></a>
 
                    </div> 
             ))} 
               <SimButton value={shows.name} name="id" onClick={this.handleBtnClick3}>Select this Program</SimButton>
                    </th>
  
    </tr>
   
  </tbody>
    </table>

                            
 </Fade>  
             
                      </div>    </ResultList>
                      
            ))
            
            
            }     </strong>

  

<ResultList>
       {this.state.results.map(result => (

<div className="container">
  <ul className="list-group">
    <li>Name: {result.name}</li>
    <img className="contain" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> 
    <li> Key: {result.id}</li>
    <li>overview: {result.overview}</li>
    <li> Further details: <DetailsButton value={result.name} name="id"  onClick={this.handleBtnClick2}></DetailsButton></li>

    <SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton>
  </ul>
  <br/>
</div>

))}
</ResultList>
<ResultList>
              <div className="col-md">
                {this.state.details.map(detail => (

                  <div className="container">
                  
                   
                     <div>
Name: {detail.show.name} <br/>
Premiere Date: {detail.show.premiered} <br/>
 Status: {detail.show.status} 
 <br/>
 <br/>
 {/* {detail.map(detailNew => (
  <div> 
 Audience Rating: {detailNew.rating.average}
 </div> 
))} */}
                    </div> 
 
                  
                  </div>
                ))}

              </div>
            </ResultList>
            <ResultList>
       {this.state.today.map(result => (

<div className="container">
  <ul className="list-group">
    <li>Name: {result.name}</li>
    <img className="contain" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> 
    <li> Key: {result.id}</li>
    <li>overview: {result.overview}</li>
    <li> Further details: <DetailsButton value={result.name} name="id"  onClick={this.handleBtnClick2}></DetailsButton></li>

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
  