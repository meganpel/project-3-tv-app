import React, { Component } from "react";
import API from "../../utils/API";
import ResultList from "../../Components/ResultList";
import { Container } from "../../Components/Grid";
import { Input, Button } from "../../Components/Form";
import SimButton from "../../Components/SimButton";
import WatchButton from "../../Components/WatchButton";
import Fade from "react-reveal/Fade";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./TV.css";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const APP_URL = process.env.REACT_APP_NODE_URL;

class TV extends Component {
  state = {
    results: [],
    details: [],
    term: "",
  };

  handleBtnClick = event => {
    const value = event.target.value;
    this.searchSimilar(value);
    scroll.scrollToTop();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchSimilar = value => {
    fetch(APP_URL + "similar?id=" + value, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          results: res.data,
          details: [],
          term: ""
        });
      })
      .catch(err => console.log(err));
  };

  searchByTerm = event => {
    event.preventDefault();
    if (this.state.term) {
      fetch(APP_URL + "search?term=" + this.state.term, {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'}),
        credentials: 'include'
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            results: res.data,
            details: [],
            term: ""
          });
        })
        .catch(err => console.log(err));
    }
  };

  searchByCurrentDate = event => {
    event.preventDefault();

    fetch(APP_URL + "today", {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {

      this.setState({
        results: res.data,
        details: [],
        term: ""
      });
    })
    .catch(err => console.log(err));
  };

  searchByDate = event => {
    event.preventDefault();
    if (this.state.term) {
      API.date(this.state.term)
        .then(res => {

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].show.summary !== null) {
              res.data[i].show.summary = res.data[i].show.summary.replace(/<(?:.|\n)*?>/gm, '');
            }
          }

          this.setState({
            details: res.data,
            results: [],
            term: ""
          });
        })
        .catch(err => console.log(err));
    }
  };

  toggleWatchlist = id => {
    fetch(APP_URL + "watchlist/press", {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include',
      body: JSON.stringify({id: id}),
    })
      .then(res => res.json())
      .then(res => {

        let results = this.state.results;

        results.forEach(function(row) {
          if (row.id === id) {
            if (res.favorite === true) {
              row.favorite = true;
            } else {
              row.favorite = false;
            }
          }
        });

        this.setState({results: results});
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container d-flex justify-content-center>
        <p />

        <div className="row">
          <div className="col-sm-8">
            <Fade top>
              <img src="images/logo-icon.png" width="274" height="177" />
              <img src="images/observer.png" />
              <h4>Search, discover and plan your own programming schedule</h4>
            </Fade>
          </div>
          <div className="col-sm-4">
            <Tabs>
              <TabList>
                <Tab>Term</Tab>
                <Tab>Current Date</Tab>
                <Tab>Select Date</Tab>{" "}
              </TabList>
              <TabPanel>
                <form>
                  <Input
                    value={this.state.term}
                    onChange={this.handleInputChange}
                    name="term"
                    placeholder="Term (required)"
                  />

                  <Button
                    disabled={!this.state.term}
                    onClick={this.searchByTerm}
                  >
                    Search
                  </Button>
                </form>
              </TabPanel>
              <TabPanel>
                {" "}
                Find what's on TV Today <p />
                <Button onClick={this.searchByCurrentDate}>Search</Button>
              </TabPanel>
              <TabPanel>
                {" "}
                Find out what's on TV by specific date
                <p>
                  {" "}
                  <i>Note: Currently in testing phase</i>
                </p>
                <Input
                  type="date"
                  value={this.state.term}
                  onChange={this.handleInputChange}
                  name="term"
                  placeholder="Term (required)"
                />
                <Button
                  disabled={!this.state.term}
                  onClick={this.searchByDate}
                >
                  Search
                </Button>
              </TabPanel>{" "}
            </Tabs>
          </div>
        </div>

        <p />

        <ResultList>
          {this.state.results.map(result => (
            <div className="container">
              <Fade top>
                <table className="table">
                  <tbody>
                  <tr>
                    <th scope="col">
                      <img
                        className="contain"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = "images/logo-icon.png";
                        }}
                        src={
                          `https://image.tmdb.org/t/p/w600_and_h900_bestv2` +
                          `${result.poster_path}`
                        }
                      />{" "}
                    </th>
                    <th scope="col">
                      {" "}
                      <p className="name">{result.name}</p>
                      <p> {result.overview} </p>
                      <p>
                        {this.props.loggedIn ? (<WatchButton favorite={result.favorite} id={result.id} toggleWatchlist={this.toggleWatchlist.bind(this)} />) : (null)}

                        <SimButton
                          value={result.id}
                          name="id"
                          onClick={this.handleBtnClick}
                        >
                          Find Similar Titles
                        </SimButton>
                      </p>
                      <p>
                        <i>Check Availability on:</i>
                      </p>
                      <a
                        href={
                          process.env.REACT_APP_DB_URL_8 +
                          result.name +
                          " site:netflix.com"
                        }
                        target="_blank"
                      >
                        <button value={result.name} className="netflix">
                          Netflix
                        </button>
                      </a>
                      <a
                        href={
                          process.env.REACT_APP_DB_URL_8 +
                          result.name +
                          " site:hulu.com"
                        }
                        target="_blank"
                      >
                        <button value={result.name} className="hulu">
                          Hulu
                        </button>
                      </a>
                      <a
                        href={
                          process.env.REACT_APP_DB_URL_8 +
                          result.name +
                          " site:amazon.com"
                        }
                        target="_blank"
                      >
                        <button value={result.name} className="amazon">
                          Amazon
                        </button>
                      </a>
                    </th>
                  </tr>
                  </tbody>
                </table>
                <p />
              </Fade>
            </div>
          ))}
        </ResultList>
        <ResultList>
          {this.state.details.map(detail => (
            <div className="container">
              <Fade top>
                <table className="table">
                  <tbody>
                  <tr>
                    <th scope="col">
                      <img
                        className="contain"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = "images/logo-icon.png";
                        }}
                        src={detail.show.image === null ? null : detail.show.image.medium}
                      />{" "}
                    </th>

                    <th scope="col">
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

      </Container>
    );
  }
}
export default TV;
