import axios from "axios";
const movieKey = require("key.js");
const BASEURL = "https://api.themoviedb.org/3/search/tv";
const BASEURL2 = "https://api.themoviedb.org/3/tv/";

export default {
  search: function(search) {
    return axios.get(BASEURL + "?api_key=" + movieKey  + "&query=" + search);
  },


  similar: function(id){
    return axios.get(BASEURL2 + id + "/similar?api_key=" + movieKey);
  }




};


