import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false,
            services: []


        }
    }
    componentDidMount() {
        fetch(`/services?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    services: json,
                    DataisLoaded: true
                });
            })
    }





    renderProviders() {
        if (this.state.DataisLoaded) {
            return (
                <table className="table styled-table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>

                            <th scope="col">logo</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.services.map((item, index) => {
                            return (
                                <tr >
                                    <td style={{ paddingTop: "25px" }}>{item.name}</td>

                                    <td><img src={item.icon} height="60px" /> </td>
                                    <td>
                                        <a
                                            href={'/editservice/' + item._id}
                                            className="btn btn-secondary"
                                            style={{ color: "#fff" }}>edit</a>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            )
        } else {
            return (
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            )
        }
    }



    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "120px" }} className="container ordersPage" >
                <div className='row' style={{ textAlign: "left" }}>
                    <a href='/addService'>add service</a>
                </div>
                <div className="row">
                    <h2>service</h2>
                    <div className="col-md-12">
                        {this.renderProviders()}
                    </div>
                </div>



            </div>
        )
    }
};
