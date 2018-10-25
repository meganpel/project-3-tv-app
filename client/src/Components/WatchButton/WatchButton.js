import React from "react";
import './WatchButton.css';

const WatchButton = props => (
  <button type="button" className={props.favorite ? "watch remove-watch" : "watch"} onClick={() => props.toggleWatchlist(props.id)}><span className="fa fa-tv"></span> {props.favorite ? "Remove From Watchlist" : "Add To Watchlist"}</button>
);

export default WatchButton;