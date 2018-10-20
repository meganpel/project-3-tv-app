import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;
const URL2 = process.env.REACT_APP_DB_URL_2;
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
  },
    search: function(term) {
      return axios.get(URL2 + "?api_key=" + process.env.REACT_APP_API_KEY_2  + "&query=" + term);
    }
  ,
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
