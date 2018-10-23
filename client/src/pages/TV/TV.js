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
    today: [],

    
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

  code= (value) => {
    API.code(value)
      .then(res => {
        this.setState({
          details: res.data,
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
    API.search(this.state.term)
      .then(res =>
        {this.setState({
          results: res.data.results,
          simResults:[],
          shows: [],
          today: [],
          details: [],
          term: ""
        });
    
        }
      )
      .catch(err => console.log(err));
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

      <div class="row">
      <div class="col-sm-8">
      Search:
      </div>
      <div class="col-sm-4">

      <Tabs>
    <TabList>
         <Tab>Term</Tab> 
         <Tab>Current Date</Tab>
         <Tab>Select Date</Tab>  </TabList>
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
               </TabPanel> 
               
               <TabPanel> Find out what's on TV today <br/>
              
            <Button
                onClick={this.handleFormSubmit3}
              >
                Search 
              </Button>
               </TabPanel>  </Tabs>
            </div>
            </div>
       
     <br/>
   
<ResultList>
       {this.state.results.map(result => (

<div className="container"><Fade top> 
  <ul className="list-group">
     <table class="table">
            <tbody>    <tr>
      <th scope="col">
    <img className="contain"  onError={(e)=>{e.target.onerror = null; e.target.src=""}} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> </th>
    <th scope="col" > <p className="name">{result.name}</p>
 {result.overview} </th>    </tr>
   
   </tbody>
     </table>
    
    <li> Further details: <DetailsButton value={result.name} name="id"  onClick={this.handleBtnClick2}></DetailsButton></li>

    <SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton>
  </ul>
  <br/></Fade> 
</div>

))}
</ResultList>
<ResultList><Fade top> 
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

              </div></Fade> 
            </ResultList>
          

          <ResultList>
       {this.state.today.map(result => (

<div className="container"><Fade top> 
  <ul className="list-group">
     <table class="table">
            <tbody>    <tr>
      <th scope="col">
    <img className="contain" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> </th>
    <th scope="col" > <p className="name">{result.name}</p>
 {result.overview} </th>    </tr>
   
   </tbody>
     </table>
    
    <li> Further details: <DetailsButton value={result.name} name="id"  onClick={this.handleBtnClick2}></DetailsButton></li>

    <SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton>
  </ul>
  <br/></Fade> 
</div>

))}
</ResultList>


 <Col size="md-4">
            <ResultList><Fade top> 
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

              </div></Fade>
            </ResultList>

          </Col>
      </Container>
    );
  }
}
export default TV;
  