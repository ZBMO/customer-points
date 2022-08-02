import React, { Component } from 'react';
import MonthRewards from "./MonthRewards";

class CustomerCard  extends Component {
  render () {
    return(
      <div className="customer-card">
        <div style={{display:"flex", flexDirection:"column"}}>
          <span>Name: {this.props.customer.name}</span>
          <span>Total Spent: {this.props.customer.totalSpent}</span>
          <span>Total Points: {this.props.customer.totalPoints}</span>
          <div style={{display:"flex", flexDirection:"column"}}>
            {this.props.customer.threeMonthRewards.map((monthData, i) =>
              <MonthRewards key={i} monthData={monthData} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerCard;