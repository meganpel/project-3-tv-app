import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Calendar from 'react-calendar';

class MyCal extends Component {
    state = {
        pickerDate: new Date(),
        calDate: new Date(),
        show: "",
        alertDays: []
    }


    pickerChange = date => {
    
    this.setState({ pickerDate: date });
    console.log(this.state.pickerDate)
    }

    //  handleFormSubmit

    handleInputChange = input => {
        this.setState({show: input})
    }

    // // showAlert
    //   if new Date() =< 

    render() {
        return (
            <div className="wrapper">
                <div className="card">
                <h1> Set a Show Reminder</h1>

                    <div className="card-body">
                    <h4> Today</h4>
                        <Calendar
                            value={this.state.calDate}
                            // onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="show">Show Name:</label>
                        <input
                             onChange={this.handleInputChange}
                            value={this.state.show}
                            name="show"
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            id="show"
                        />
                        <br />
                        <div>
                        <label htmlFor="date">Date of Program (time optional):</label>
                            <DateTimePicker
                                onChange={this.pickerChange}
                                value={this.state.pickerDate}
                            />
                        </div>
                        <br />
                        <label htmlFor="alert">Alerts:</label>
                            <select className="custom-select">
                              <option defaultValue>Set Alert</option>
                              <option value="1">One Day Before Show Airs</option>
                              <option value="2">Two Days Before Show Airs </option>
                              <option value="3">Seven Days Before Show Airs</option>
                            </select>
                            <br />
                            <button onClick={this.onClick}/> Submit Date <button/>
                        
                    </div>
                </form>
            </div>
        );
    }
}

export default MyCal;



// {/* /* <button
//                             onClick={this.handleFormSubmit}
//                             className="btn btn-info"
//                         >
//                             Save Reminder
//                         </button> */ */