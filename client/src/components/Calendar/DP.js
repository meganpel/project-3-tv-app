import React from "react";
import DatePicker from "react-datepicker";


import "./react-datepicker.css"
import "./Style.css"
// import MyContainer from "./MyContainer";


class IncludeTime extends React.Component {
    state = {
        date: ""  
    }

    handleChange = date => {
        this.setState({
            date: moment()
        });
    };


  onClick = date => {
      this.setState({date});
      console.log(this.state.date);

  };


    render() {
        return (

        
            // <MyContainer>
                <div className="row">

                    <div className="column">
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            isClearable={true}
                            dateFormat="YYYY-DD-MM"
                            // placeholderText="Click to select a date" 
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
                            }} />
                    </div>
                    <button onClick={this.onClick}/> Submit Date <button/>
                </div>
            // </MyContainer>
    );
    }
}

export default IncludeTime;