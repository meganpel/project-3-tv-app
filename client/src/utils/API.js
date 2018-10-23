import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;
const URL2 = process.env.REACT_APP_DB_URL_2;
const URL3 = process.env.REACT_APP_DB_URL_3;
const URL4 = process.env.REACT_APP_DB_URL_4;
const URL5 = process.env.REACT_APP_DB_URL_5;
const URL6 = process.env.REACT_APP_DB_URL_6;

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
  similar: function(id){
    return axios.get(URL3 + id + "/similar?api_key=" + process.env.REACT_APP_API_KEY_2);
  },
  
   getToday: function(){
    return axios.get(URL4 + "?api_key=" + process.env.REACT_APP_API_KEY_2);    
  },

  details: function(id){
    return axios.get(URL5 + id);
  },
 code: function(term){
    return axios.get(URL6 + term);
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
