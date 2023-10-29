import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export class Providers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false,
            providers: []


        }
    }
    componentDidMount() {
        fetch(`/allProvidersAdmin?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    providers: json,
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
                        {this.state.providers.map((item, index) => {
                            return (
                                <tr >
                                    <td style={{ paddingTop: "25px" }}>{item.name}</td>

                                    <td><img src={item.logo} height="60px" /> </td>
                                    <td>
                                        <a
                                            href={'/editProvider/' + item._id}
                                            className="btn btn-secondary"
                                            style={{color : "#fff"}}>edit</a>
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
                    <a href='/addprovider'>add provider</a>
                </div>
                <div className="row">
                    <h2>Providers</h2>
                    <div className="col-md-12">
                        {this.renderProviders()}
                    </div>
                </div>



            </div>
        )
    }
};
