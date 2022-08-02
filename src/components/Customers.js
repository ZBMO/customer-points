import React, { Component } from 'react';
import CustomerCard from "./CustomerCard"

class Customers  extends Component {
  data = require('../mockData.json');

  constructor(props) {
    super(props);
    this.state = {
      customers: this.data.customers
    }
  }

  render () {
    return(
      <div className="customers">
      <span>Customer Reward Center</span>
        {this.state.customers.map((customer, i) =>
          <CustomerCard key={i} customer={customer}/>)
        }
      </div>
    );
  }
}

export default Customers;