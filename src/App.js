import React from "react";
import './App.css';
import Customers from "./components/Customers";

import { createServer } from "miragejs"

window.server = createServer({
  routes() {
    this.get("/customers", () => {
      return {
        customers: [
          {"name": "joe",
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
            "name": "lisa",
            "orderHistory": [
              {"date": "06/01/2022", "price": 119},
              {"date": "06/10/2022", "price": 29.55},
              {"date": "07/03/2022", "price": 55.55},
              {"date": "07/17/2022", "price": 99.55},
              {"date": "07/22/2022", "price": 201.55},
              {"date": "07/29/2022", "price": 38.55},
              {"date": "08/05/2022", "price": 99.55}
            ]
          },
          {"name": "carlos",
            "orderHistory": [
              {"date":  "06/01/2022", "price": 19.55},
              {"date":  "06/10/2022", "price": 29.55},
              {"date":  "07/03/2022", "price": 55.55},
              {"date":  "07/17/2022", "price": 88.55},
              {"date":  "07/22/2022", "price": 201.55},
              {"date":  "07/29/2022", "price": 38.55},
              {"date":  "08/05/2022", "price": 1200.22}
            ]
          }
        ]
      }
    })
  },
})

function App() {
  let [customers, setCustomers] = React.useState([])

  React.useEffect(() => {
    fetch("/customers")
      .then((res) => res.json())
      .then((json) => setCustomers(json.customers))
  }, [])


  return (
    <div className="App">
      <Customers customers={customers}/>
    </div>
  );
}

export default App;
