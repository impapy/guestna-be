import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
var Confirm = require('react-confirm-bootstrap');

export class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false,
            events: []


        }
    }
    componentDidMount() {
        fetch(`/allEventsAdmin?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    events: json,
                    DataisLoaded: true
                });
            })
    }





    renderEvents() {
        if (this.state.DataisLoaded) {
            return (
                <table className="table styled-table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">from day</th>
                            <th scope="col">to day</th>

                            <th scope="col">from hour</th>
                            <th scope="col">to hour</th>
                            <th scope="col">actions </th>
                            <th scope="col">hide </th>


                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((item, index) => {
                            return (
                                <tr >
                                    <td>{item.name} </td>
                                    <td>{item.fromDay}</td>
                                    <td>{item.toDay}</td>
                                    <td>{item.fromHour}</td>
                                    <td>{item.toHour}</td>
                                    <td >
                                        <a href={'/EditEvent/' + item._id} className='btn btn-primary'>عدل</a>
                                        <a href='#' className='btn btn-danger'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                Meteor.call("deleteEvent", item._id, (err) => {
                                                    if (err) {
                                                        alert(err)
                                                    } else (
                                                        location.reload()
                                                    )
                                                })
                                            }}>امسح</a>

                                    </td>
                                    <td>
                                        <label class="switch">
                                            <input type="checkbox" checked={item.hide ? item.hide : false} value={item.hide ? item.hide : false}
                                                onClick={(e) => Meteor.call("hideEvent", { eventId: item._id, show: !e.target.value }, (err, res) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        location.reload()
                                                    }
                                                })} />
                                            <span className="slider round"></span>
                                        </label>
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
                    <a href='/addEvent'>add Event</a>
                </div>
                <div className="row">
                    <h2>Events</h2>
                    <div className="col-md-12">
                        {this.renderEvents()}
                    </div>
                </div>



            </div>
        )
    }
};
