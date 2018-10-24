import React, { Component } from "react";
import API from "../../utils/API";
import ResultList from "../../components/ResultList"
import { Container } from "../../components/Grid";
import { Input,  Button } from "../../components/Form";
import SimButton from "../../components/SimButton";
import WatchButton from "../../components/WatchButton";
import Fade from 'react-reveal/Fade';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./TV.css"

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



  // componentDidMount() {
  //   this.showCollect();
  // }
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

  // showCollect = () => {
  //   API.UserData()
  //     .then(res =>
  //       this.setState({ shows: res.data })
  //     )
  //     .catch(err => console.log(err));
  // };


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
          shows: [],
          searchResults: [],
          results: [],
          details: [],
          today: [],
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
          shows: [],
          searchResults: [],
          simResults: [],
          details: [],
          term: "",
          today: []
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
handleFormSubmit3 = event => {
  event.preventDefault();
  if (this.state.term) {
  API.code(this.state.term)
    .then(res =>
      {this.setState({
        details: res.data,
        simResults:[],
        shows: [],
        today: [],
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
  <p></p>

      <div className="row">
      <div className="col-sm-8">
      <Fade top> 
      <img src="images/logo-icon.png" width="274" height="177"/>
     <img src="images/observer.png"/>
</Fade>
      </div>
      <div className="col-sm-4">

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
            <TabPanel> Find what's on TV Today <p></p>
            <Button
                onClick={this.handleFormSubmit2}
              >
                Search 
              </Button>
               </TabPanel> 
               
               <TabPanel> Find out what's on TV by specific date
                <p> <i>Note: Currently in testing phase</i></p>
               <Input type="date" 
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Term (required)"
              />
      
              <Button
                disabled={!(this.state.term)}
                onClick={this.handleFormSubmit3}
              >
                Search 
              </Button>
               </TabPanel>  </Tabs>
            </div>
            </div>
       
            <p></p>
   
<ResultList>
       {this.state.results.map(result => (

<div className="container"><Fade top> 

     <table className="table">
            <tbody>    <tr>
      <th scope="col">
      <img className="contain"  onError={(e)=>{e.target.onerror = null; e.target.src="images/logo-icon.png"}} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> </th>
    <th scope="col" > <p className="name">{result.name}</p>
 {result.overview} 
 <p></p>
 <p> <WatchButton/><SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton></p>
  
 <i>Check Availability on:</i> <p></p>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:netflix.com'} target="_blank"><button value={result.name} className='netflix'>Netflix</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:hulu.com'} target="_blank"><button value={result.name} className='hulu'>Hulu</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:amazon.com'} target="_blank"><button value={result.name} className='amazon'>Amazon</button></a>
 
 </th>    </tr>

   </tbody>
     </table>
 <p></p>
 </Fade> 
</div>

))}
</ResultList>
<ResultList>

 
                {this.state.details.map(detail => (

                  <div className="container"><Fade top> 
                       <table className="table">
            <tbody>    <tr>
      <th scope="col">
    <img className="contain" onError={(e)=>{e.target.onerror = null; e.target.src="images/logo-icon.png"}} src={detail.show.image}/> </th> 

 <th scope="col" >
 <p className="name">{detail.show.name}</p>
 <p>{detail.show.summary}</p>
 <p>Premiere Date: {detail.show.premiered}</p>
 <p>Status: {detail.show.status}</p>
</th>
   </tr>
   </tbody>
     </table>

                  </Fade>
                  </div>
                ))}

           
            </ResultList>
          

          <ResultList>
       {this.state.today.map(result => (

<div className="container"><Fade top> 
     <table className="table">
            <tbody>    <tr>
      <th scope="col">
      <img className="contain"  onError={(e)=>{e.target.onerror = null; e.target.src="images/logo-icon.png"}} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> </th>
    <th scope="col" > <p className="name">{result.name}</p>
 {result.overview} 
<p></p>
 <p> <WatchButton/><SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton></p>
  
 <p><i>Check Availability on:</i> </p>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:netflix.com'} target="_blank"><button value={result.name} className='netflix'>Netflix</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:hulu.com'} target="_blank"><button value={result.name} className='hulu'>Hulu</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:amazon.com'} target="_blank"><button value={result.name} className='amazon'>Amazon</button></a>
 
 </th>    </tr>

   </tbody>
     </table>
 <p></p>
 </Fade> 
</div>

))}
</ResultList>


            <ResultList>
              <div className="col-md">
              {this.state.simResults.map(result => (

<div className="container"><Fade top> 
     <table className="table">
            <tbody>    <tr>
      <th scope="col">
      <img className="contain"  onError={(e)=>{e.target.onerror = null; e.target.src="images/logo-icon.png"}} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2` + `${result.poster_path}`}/> </th>
    <th scope="col" > <p className="name">{result.name}</p>
 {result.overview} 
 <p></p>
 <p> <WatchButton/><SimButton value={result.id} name="id" onClick={this.handleBtnClick}>Find Similar Titles</SimButton></p>
 
<p><i>Check Availability on:</i></p>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:netflix.com'} target="_blank"><button value={result.name} className='netflix'>Netflix</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:hulu.com'} target="_blank"><button value={result.name} className='hulu'>Hulu</button></a>
 <a href={process.env.REACT_APP_DB_URL_8 + result.name + ' site:amazon.com'} target="_blank"><button value={result.name} className='amazon'>Amazon</button></a>
 
 </th>    </tr>

   </tbody>
     </table>
  <p></p></Fade> 
</div>
))} 
              </div>
            </ResultList>

     
      </Container>
    );
  }
}
export default TV;
  