import axios from "axios";
const movieKey = require("key.js");
const BASEURL = "https://api.themoviedb.org/3/search/tv";
 

export default {
  search: function(search) {
    return axios.get(BASEURL + "?api_key=" + movieKey  + "&query=" + search);
  }
};


