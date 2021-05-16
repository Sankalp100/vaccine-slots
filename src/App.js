import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    };
  }
  async getUsersData() {
    const res = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=312&date=16-05-2021"
    );
    console.log(res.data);
    this.setState({ loading: false, users: res.data.centers });
  }

  // useEffect() {
  //   this.getUsersData();
  //   const interval = setInterval(() => {
  //     this.getUsersData();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }

  componentDidMount() {
    this.getUsersData();
    // this.useEffect();
    const interval = setInterval(() => {
      this.getUsersData();
    }, 10000);
    return () => clearInterval(interval);
  }

  render() {
    const columns = [
      {
        Header: "CENTER_ID",
        accessor: "center_id"
      },
      {
        Header: "NAME",
        accessor: "name"
      },

      {
        Header: "PIN",
        accessor: "pincode"
      },
      {
        Header: "VACCINE",
        accessor: "sessions.0.vaccine"
      },
      {
        Header: "AGE",
        accessor: "sessions.0.min_age_limit"
      },
      {
        Header: "DOSE1",
        accessor: "sessions.0.available_capacity_dose1"
      },
      {
        Header: "DOSE2",
        accessor: "sessions.0.available_capacity_dose2"
      }
    ];
    return <ReactTable data={this.state.users} columns={columns} />;
  }
}
