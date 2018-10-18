import axios from "axios";
// let term;

const URL = process.env.REACT_APP_DB_URL;

const request = {
    method: 'GET',
    headers: {
      'X-Mashape-Key': process.env.REACT_APP_API_KEY,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

export default {
  Find: function(term) {
    return axios(URL + term, request)
    // .then((response) => {
    //   const search = response.data;

    //   console.log(search);

    //   this.setState({ searchResults: search})
    // })
    
  },
  UserData: function() {
    return axios.get("/api/new");
  },
  Saved: function(data) {
    return axios.post("/api/new", data);
  },
  Deleted: function(id) {
    return axios.delete("/api/new/" + id);
  }

};
