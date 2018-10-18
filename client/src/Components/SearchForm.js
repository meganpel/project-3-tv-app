import React from "react";

const SearchForm = props => (
  <form>
    <div className="form-group">
      <label htmlFor="search">Favorite Program:</label>
      <input
        onChange= {props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        className="form-control"
        placeholder="Search For a Show"
        id="search"
      />
      <br />
      <button
        onClick={props.handleFormSubmit}
        className="btn btn-primary"
      >
        Search
      </button>
    </div>
  </form>
);

export default SearchForm;
