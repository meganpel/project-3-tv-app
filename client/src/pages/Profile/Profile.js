import React, { Component } from "react";
import ResultList from "../../Components/ResultList";
import { Container } from "../../Components/Grid";
import WatchButton from "../../Components/WatchButton";
import Fade from "react-reveal/Fade";
import "./Profile.css";

const APP_URL = process.env.REACT_APP_NODE_URL;

class Profile extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    fetch(APP_URL + "watchlist", {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({results: res.data});
      })
      .catch(err => console.log(err));
  }

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
              <h4>My Profile and Watchlist</h4>
            </Fade>
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

      </Container>
    );
  }
}
export default Profile;
