import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';

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

    MyContainer({ className, children }) {
        return (
            <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
                <CalendarContainer className={className}>
                    <div style={{ background: '#f0f0f0' }}>What is your favorite day?</div>
                    <div style={{ position: 'relative' }}>
                        {children}
                    </div>
                </CalendarContainer>
            </div>
        );
    };

    //styled container


    render() {
        return (

            <DatePicker
                inline
                dateFormat="YYYY/MM/DD"
                selected={this.state.startDate}
                onSelect={this.handleChange}

                placeholderText="Click to select a date"
                isClearable={true}
                placeholderText="cleared!"
                //select time
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
                //time zone

                utcOffset="-4"
                dateFormat="DD-MMM HH:mm"
                todayButton="Today in NYC"
                onChange={this.handleTime}

                onClickOutside={this.handleClose}
                calendarContainer={MyContainer}
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