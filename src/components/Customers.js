import React, { Component } from 'react';
import CustomerCard from "./CustomerCard"

class Customers  extends Component {
  data = require('../resources/preSortedMockData.json');
  single_point_threshold = 50;
  double_point_threshold = 100;
  double_point_multiplier = 2;
  // preSortedMockData =
  //   [
  //     {
  //     "name": "joe",
  //     "orderHistory": [
  //       {"date":  "06/01/2022", "price": 19.55},
  //       {"date":  "06/10/2022", "price": 29.55},
  //       {"date":  "07/03/2022", "price": 55.55},
  //       {"date":  "07/17/2022", "price": 99.55},
  //       {"date":  "07/22/2022", "price": 201.55},
  //       {"date":  "07/29/2022", "price": 38.55},
  //       {"date":  "08/05/2022", "price": 83.55}
  //       ]
  //     },
  //     {
  //       "name": "carlos",
  //       "orderHistory": [
  //         {"date": "2022-06-01", "price": 19.55},
  //         {"date": "2022-06-10", "price": 29.55},
  //         {"date": "2022-07-03", "price": 55.55},
  //         {"date": "2022-07-17", "price": 99.55},
  //         {"date": "2022-07-22", "price": 201.55},
  //         {"date": "2022-07-29", "price": 38.55},
  //         {"date": "2022-08-05", "price": 83.55}
  //       ]
  //     }
  //   ]
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
        totalPoints += this.getTotalPoints(order.price);

        let orderDate = new Date(order.date);
        let orderMonth = orderDate.toLocaleString(
          'default', {month: 'long'});

        if (Object.keys(threeMonthRewards).includes(orderMonth)) {
          threeMonthRewards[orderMonth].spent += order.price;
          threeMonthRewards[orderMonth].points = this.getTotalPoints(threeMonthRewards[orderMonth].spent)
        }
        else {
          threeMonthRewards[orderMonth] = {
            "spent": order.price,
            "points": this.getTotalPoints(order.price)
          }
        }
      })

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