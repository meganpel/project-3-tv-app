import axios from "axios";

const REACT_APP_DATE_URL = process.env.REACT_APP_DATE_URL;

export default {
  date: function(term) {
    return axios.get(REACT_APP_DATE_URL + '&date=' + term);
  },
};