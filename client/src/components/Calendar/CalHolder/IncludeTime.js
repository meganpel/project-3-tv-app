import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
// import  "./reset";
// import  "./examples.scss";
import "./react-datepicker.css"
 import  "./Style.css"
import MyContainer from "./MyContainer";

 class IncludeTime extends React.Component {
  state = {
    startDate: moment()
      .hours(16)
      .minutes(30)
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <MyContainer>
      <div className="row">
        
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            includeTimes={[
              moment()
                .hours(17)
                .minutes(0),
              moment()
                .hours(18)
                .minutes(30),
              moment()
                .hours(19)
                .minutes(30),
              moment()
                .hours(17)
                .minutes(30)
            ]}
            dateFormat="LLL"
       
          popperClassName="some-custom-class"
          popperPlacement="top-end"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '5px, 10px'
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport'
            }
          }}/>
      </div>
      </div>
      </MyContainer>
    );
  }
}

export default IncludeTime;