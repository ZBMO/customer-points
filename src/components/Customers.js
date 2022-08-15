import React, { Component } from 'react';
import CustomerCard from "./CustomerCard"

class Customers  extends Component {
  data = require('../resources/unFormattedMockData.json');
  single_point_threshold = 50;
  double_point_threshold = 100;
  double_point_multiplier = 2;
  formattedCustomers = []

  constructor(props) {
    super(props);
    this.state = {
      rawCustomers: this.data.customers,
    }
  }

  getTotalPoints = (moneySpent) => {
    let points = 0

    if (moneySpent > 100) {
      points = this.single_point_threshold + (moneySpent - this.double_point_threshold)*this.double_point_multiplier
    } else if (moneySpent > 50) {
      points = moneySpent - this.single_point_threshold
    }

    return Math.round(points)
  }

  reformatCustomerData = () => {
    this.formattedCustomers = this.state.rawCustomers.map(customer => {

      let customerTotal = 0;
      let totalPoints = 0;
      let threeMonthRewards = {};

      customer.orderHistory.forEach(order => {
        customerTotal += order.price;

        let orderDate = new Date(order.date);
        let orderMonth = orderDate.toLocaleString('default', {month: 'long'});

        if (Object.keys(threeMonthRewards).includes(orderMonth)) {
          threeMonthRewards[orderMonth].spent += order.price;
          threeMonthRewards[orderMonth].points += this.getTotalPoints(order.price)
        }
        else {
          threeMonthRewards[orderMonth] = {
            "spent": order.price,
            "points": this.getTotalPoints(order.price)
          }
        }
      })

      for (const key in threeMonthRewards) {
        totalPoints += threeMonthRewards[key].points;
      }



      return {
        "name": customer.name,
        "totalSpent": customerTotal,
        "totalPoints": totalPoints,
        "threeMonthRewards": threeMonthRewards}
    })
  }

  render () {
    this.reformatCustomerData();

    return(
      <div className="customers">
      <span>Customer Reward Center</span>
        {this.formattedCustomers.map((customer, i) =>
          <CustomerCard key={i} customer={customer}/>)
        }
      </div>
    );
  }
}

export default Customers;