import React, { Component } from 'react';
import CustomerCard from "./CustomerCard"

class Customers  extends Component {
  data = require('../resources/mockData.json');
  single_point_threshold = 50;
  double_point_threshold = 100;
  double_point_multiplier = 2;
  preSortedMockData =
    [
      {
      "name": "joe",
      "orderHistory": [
        {"date":  "06/01/2022", "price": 19.55},
        {"date":  "06/10/2022", "price": 29.55},
        {"date":  "07/03/2022", "price": 55.55},
        {"date":  "07/17/2022", "price": 99.55},
        {"date":  "07/22/2022", "price": 201.55},
        {"date":  "07/29/2022", "price": 38.55},
        {"date":  "08/05/2022", "price": 83.55}
        ]
      },
      {
        "name": "carlos",
        "orderHistory": [
          {"date":  "06/01/2022", "price": 19.55},
          {"date":  "06/10/2022", "price": 29.55},
          {"date":  "07/03/2022", "price": 55.55},
          {"date":  "07/17/2022", "price": 99.55},
          {"date":  "07/22/2022", "price": 201.55},
          {"date":  "07/29/2022", "price": 38.55},
          {"date":  "08/05/2022", "price": 83.55}
        ]
      }
    ]
  formattedCustomers = []

  constructor(props) {
    super(props);
    this.state = {
      rawCustomers: this.data.customers,
    }
  }

  getTotalPoints = (moneySpent) => {
    return Math.round((moneySpent - this.single_point_threshold)
      + (moneySpent - this.double_point_threshold)*this.double_point_multiplier)
  }

  reformatCustomerData = () => {
    console.log("reformatCustomers-----------------");

    this.formattedCustomers = this.preSortedMockData.map(customer => {

      let customerTotal = 0;

      customer.orderHistory.forEach(order => {
        customerTotal += order.price;
      })

      return {
        "name": customer.name,
        "totalSpent": customerTotal,
        "totalPoints": this.getTotalPoints(customerTotal),
        "threeMonthRewards": []}
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