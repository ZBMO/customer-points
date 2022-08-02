import React, { Component } from 'react';

class MonthRewards  extends Component {
  render () {
    return(
      <div className="month-rewards">

        <div style={{borderBottom:"solid"}}>
            <span>Month: {this.props.monthData.month}, </span>
            <span style={{marginLeft:"20px"}}>Spent: ${this.props.monthData.spent}, </span>
            <span style={{marginLeft:"20px"}}>Points: {this.props.monthData.points}</span>
        </div>
      </div>
    );
  }
}

export default MonthRewards;