import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export class Packges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false,
            packges: []


        }
    }
    componentDidMount() {
        fetch(`/allPackgesAdmin?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    packges: json,
                    DataisLoaded: true
                });
            })
    }





    renderPackges() {
        if (this.state.DataisLoaded) {
            return (
                <table className="table styled-table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">from day</th>
                            <th scope="col">to day</th>

                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.packges.map((item, index) => {
                            return (
                                <tr >
                                    <td>{item.name} </td>
                                    <td>{item.fromDay}</td>
                                    <td>{item.toDay}</td>
                                    <td>
                                        <a href={"packge/" + item._id} className='btn btn-primary'>
                                            set events
                                        </a>
                                        <a href={"packgeView/" + item._id} className='btn btn-primary'>
                                            view events
                                        </a>
                                        <a href={"editPackage/" + item._id} className='btn btn-primary'>
                                            edit
                                        </a>
                                        <a href='#' className='btn btn-danger'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                Meteor.call("deletePack", item._id, (err) => {
                                                    if (err) {
                                                        alert(err)
                                                    } else (
                                                        location.reload()
                                                    )
                                                })
                                            }}>delete</a>
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
                    <a href='/addPackages'>addPackages</a>
                </div>
                <div className="row">
                    <h2>Packges</h2>
                    <div className="col-md-12">
                        {this.renderPackges()}
                    </div>
                </div>



            </div>
        )
    }
};
