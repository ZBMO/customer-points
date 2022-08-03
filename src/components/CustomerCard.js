import React, { Component } from 'react';
import MonthRewards from "./MonthRewards";

class CustomerCard  extends Component {

  render () {
    const { name, totalSpent, totalPoints, threeMonthRewards } = this.props.customer

    return(
      <div className="customer-card">
        <div style={{display:"flex", flexDirection:"column"}}>
          <span>Name: {name}</span>
          <span>Total Spent: {totalSpent}</span>
          <span>Total Points: {totalPoints}</span>
          <div style={{display:"flex", flexDirection:"column"}}>
            {Object.keys(threeMonthRewards).map((monthName, i) =>
              <MonthRewards
                key={i}
                monthName={monthName}
                monthData={threeMonthRewards[monthName]} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerCard;