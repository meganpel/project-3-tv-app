import React, { Component } from 'react';
import Calendar from 'react-calendar';

class ShowCal extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date });

  onClick = date => {
      this.setState({date});
      console.log(this.state.date)

  }

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <button onClick={this.onClick}/> Submit Date <button/>
      </div>
    );
  }
}

export default ShowCal;