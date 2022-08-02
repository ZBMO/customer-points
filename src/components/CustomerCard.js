import React, { Component } from 'react';
import MonthRewards from "./MonthRewards";

class CustomerCard  extends Component {

  render () {
    const { customer } = this.props

    return(
      <div className="customer-card">
        <div style={{display:"flex", flexDirection:"column"}}>
          <span>Name: {customer.name}</span>
          <span>Total Spent: {customer.totalSpent}</span>
          <span>Total Points: {customer.totalPoints}</span>
          <div style={{display:"flex", flexDirection:"column"}}>
            {customer.threeMonthRewards.map((monthData, i) =>
              <MonthRewards key={i} monthData={monthData} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerCard;