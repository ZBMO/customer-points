import React, { Component } from 'react';

class MonthRewards  extends Component {
  render () {
    const { monthName, monthData } = this.props

    return(
      <div className="month-rewards">

        <div style={{borderBottom:"solid"}}>
            <span>Month: {monthName}, </span>
            <span style={{marginLeft:"20px"}}>Spent: ${monthData.spent}, </span>
            <span style={{marginLeft:"20px"}}>Points: {monthData.points}</span>
        </div>
      </div>
    );
  }
}

export default MonthRewards;