import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import MyContainer from "./MyContainer";

class Calendar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }



    render() {
        return (
            // <MyContainer>
            <DatePicker

                selected={this.state.startDate}
                onSelect={this.handleChange}
                showYearDropdown
                dateFormatCalendar="MMMM"
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                
                // select time
                // showTimeSelect
                // timeFormat="HH:mm"
                // timeIntervals={15}
                // timeCaption="time"
                // time zone
               
               
                />
                

        )
    }

};

export default Calendar;



// handleChangeRaw(value) {
//     if(value === "tomorrow") {
//       const tomorrow = moment().add(1, "day")
//       this.handleChange(tomorrow)
//     }
//   }
//   <DatePicker
//       selected={this.state.startDate}
//       onChange={this.handleChange}
//       placeholderText="Enter tomorrow"
//       onChangeRaw={(event) =>
//         this.handleChangeRaw(event.target.value)}
//   />